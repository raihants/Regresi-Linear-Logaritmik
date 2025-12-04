import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import TabelHasil from "../components/tabelHasil.jsx";

export default function OutputPage({ regressionResult, colDef, sessionId, ...props }) {
    const API_URL = "http://127.0.0.1:8000/api";
    const svgRef = useRef(null);
    const wrapperRef = useRef(null);
    const zoomRef = useRef(null);
    const [plotWidth, setPlotWidth] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (wrapperRef.current == null) return;

        const obs = new ResizeObserver(() => {
            setPlotWidth(wrapperRef.current.clientWidth);
        });

        obs.observe(wrapperRef.current);

        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (wrapperRef.current == null) return;
        if (!regressionResult) return;

        // prepare data
        const raw = regressionResult.cleaned_data || [];
        const scatterData = raw.map((d) => ({ x: +d.X, y: +d.Y }));
        const lineData = scatterData.map((p) => ({
            x: p.x,
            y: regressionResult.a + regressionResult.b * p.x,
        }));

        // dimensions
        const width = plotWidth || wrapperRef.current.clientWidth;
        const height = 400;
        const margin = { top: 40, right: 30, bottom: 50, left: 60 };
        const w = width - margin.left - margin.right;
        const h = height - margin.top - margin.bottom;

        // clear and create svg
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height);

        // root group
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        if (scatterData.length === 0) {
            g.append("text").attr("x", w / 2).attr("y", h / 2).attr("text-anchor", "middle").text("No data");
            return;
        }

        // scales (use exact extents so the view is 'zoomed-in' to data)
        const xExtent = d3.extent(scatterData, (d) => d.x) ;
        const yExtent = d3.extent(scatterData, (d) => d.y) ;

        const x = d3
            .scaleLinear()
            .domain([xExtent[0] - 0.5, xExtent[1] + 0.5])
            .range([0, w]);
        const y = d3
            .scaleLinear()
            .domain([yExtent[0] - 0.5, yExtent[1] + 0.5])
            .range([h, 0]);

        // axes
        const xAxisG = g.append("g").attr("transform", `translate(0,${h})`).call(d3.axisBottom(x));
        const yAxisG = g.append("g").call(d3.axisLeft(y));

        // gridlines
        g.append("g")
            .attr("class", "grid-x")
            .attr("transform", `translate(0,${h})`)
            .call(d3.axisBottom(x).tickSize(-h).tickFormat(""))
            .selectAll("line")
            .attr("stroke", "#eee");

        g.append("g")
            .attr("class", "grid-y")
            .call(d3.axisLeft(y).tickSize(-w).tickFormat(""))
            .selectAll("line")
            .attr("stroke", "#eee");

        // clip path using local coordinates (0,0)
        const clipId = "clip-" + Math.random().toString(36).slice(2);
        svg.append("defs")
            .append("clipPath")
            .attr("id", clipId)
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", w)
            .attr("height", h);

        const plotArea = g.append("g").attr("clip-path", `url(#${clipId})`);

        // tooltip (inside wrapper)
        // remove any old tooltip
        d3.select(wrapperRef.current).selectAll(".d3-tooltip").remove();

        const tooltip = d3
        .select(wrapperRef.current)
        .append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("padding", "6px 10px")
        .style("background", "rgba(0,0,0,0.8)")
        .style("color", "white")
        .style("font-size", "12px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("display", "none");

        // circles: start with r=0 and animate to r=4 (stagger)
        const circles = plotArea
        .selectAll("circle")
        .data(scatterData)
        .join("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 0)
        .attr("fill", "rgba(0,123,255,0.9)")
        .attr("stroke", "none")
        .attr("opacity", 0);

        // animate points with stagger
        circles
            .transition()
            .delay((_d, i) => i * 12)
            .duration(300)
            .attr("r", 4)
            .attr("opacity", 1);

        // tooltip behavior: position tooltip above the dot (not under cursor)
        circles
            .on("mouseenter", function (_event, d) {
                // highlight
                d3.select(this).attr("r", 7).attr("fill", "orange");
                // show tooltip
                tooltip.style("display", "block").html(`x: ${d.x}<br/>y: ${d.y}`);
            })
            .on("mousemove", function (event, _d) {
                const rect = wrapperRef.current.getBoundingClientRect();
                // position tooltip near the circle center, above it
                const left = event.clientX - rect.left + 12; // 12px to the right of cursor
                const top = event.clientY - rect.top - 30; // 30px above cursor
                tooltip.style("left", `${left}px`).style("top", `${top}px`);
            })
            .on("mouseleave", function () {
                d3.select(this).attr("r", 4).attr("fill", "rgba(0,123,255,0.9)");
                tooltip.style("display", "none");
            })
            .on("click", function (_event, _d) {
                // toggle selection stroke
                const cur = d3.select(this);
                const selected = cur.attr("data-selected") === "true";
                plotArea.selectAll("circle").attr("stroke", "none").attr("data-selected", null).attr("stroke-width", 0);
                if (!selected) {
                    cur.attr("stroke", "black").attr("stroke-width", 2).attr("data-selected", "true");
                }
            });

        // regression line: draw after points finish
        const lineGenerator = d3
        .line()
        .x((d) => x(d.x))
        .y((d) => y(d.y));

        const totalPointAnimTime = scatterData.length * 12 + 300; // approx when points finished

        const _regLine = plotArea
        .append("path")
        .datum(lineData)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", function () {
            const length = this.getTotalLength();
            return `${length} ${length}`;
        })
        .attr("stroke-dashoffset", function () {
            return this.getTotalLength();
        })
        .attr("opacity", 1)
        .transition()
        .delay(totalPointAnimTime + 100)
        .duration(800)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0);

        // Title and equation label
        const labelFont = Math.max(12, Math.min(24, width * 0.03));
        const labelOffset = Math.max(48, Math.min(120, width * 0.1));

        svg
            .append("text")
            .attr("x", margin.left + w / 2 - labelOffset)
            .attr("y", margin.top - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", labelFont)
            .text(`r² = ${props.applyKecermatan(regressionResult.r)}`);

        svg
            .append("text")
            .attr("x", margin.left + w / 2 + labelOffset)
            .attr("y", margin.top - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", labelFont)
            .text(`y = ${props.applyKecermatan(regressionResult.a)} + ${props.applyKecermatan(regressionResult.b)}x`);

        yAxisG
            .append("text")
            .attr("fill", "black")
            .attr("x", -h / 2)
            .attr("y", -37.5)       
            .attr("text-anchor", "middle")
            .attr("font-size", labelFont)
            .attr("transform", "rotate(-90)")
            .text("Y (Regresi)");   

        xAxisG
            .append("text")
            .attr("fill", "black")
            .attr("x", w / 2)
            .attr("y", 40)        
            .attr("text-anchor", "middle")
            .attr("font-size", labelFont)
            .text(`(x) ${colDef.x}`); 

        // zoom: wheel only (no drag panning)
        const zoom = d3
        .zoom()
        .filter((event) => {
            // allow zoom on wheel
            if (event.type === "wheel") return true;
            // allow panning ONLY with middle mouse button
            if (event.type === "mousedown" && event.button === 1) return true;
            return false;
        })
        .scaleExtent([0.5, 40])
        .translateExtent([[-200, -200], [w + 200, h + 200]])
        .on("zoom", (event) => {
            const t = event.transform;
            const zx = t.rescaleX(x);
            const zy = t.rescaleY(y);

            xAxisG.call(d3.axisBottom(zx));
            yAxisG.call(d3.axisLeft(zy));

            g.selectAll(".grid-x")
                .call(d3.axisBottom(zx).tickSize(-h).tickFormat(""))
                .selectAll("line")
                .attr("stroke", "#eee")
                .attr("stroke-width", 0.5)
                .attr("vector-effect", "non-scaling-stroke");

            g.selectAll(".grid-y")
                .call(d3.axisLeft(zy).tickSize(-w).tickFormat(""))
                .selectAll("line")
                .attr("stroke", "#eee")
                .attr("stroke-width", 0.5)
                .attr("vector-effect", "non-scaling-stroke");

            plotArea.selectAll("circle").attr("cx", (d) => zx(d.x)).attr("cy", (d) => zy(d.y));

            plotArea.selectAll("path").attr(
                "d",
                d3
                    .line()
                    .x((d) => zx(d.x))
                    .y((d) => zy(d.y))
            );
        });
        zoomRef.current = zoom;

        svg.call(zoom);
        // start with identity transform (no extra pan/scale) — axes already match data extents
        svg.call(zoom.transform, d3.zoomIdentity);

        // cleanup
        return () => {
            d3.select(wrapperRef.current).selectAll(".d3-tooltip").remove();
        };
    }, [regressionResult, refreshKey]);

    const handleResetZoom = () => {
        const svg = d3.select(svgRef.current);
        svg.transition()
            .duration(300)
            .call(zoomRef.current.transform, d3.zoomIdentity);
    };

    const handleRefresh = () => {
        setRefreshKey((k) => k + 1);
    };

    {/* WARN: button export */}
    const handleExport = async () => {
        try {
            const modelType = regressionResult.model;
            const regResp = await fetch(`${API_URL}/regression/${modelType}/pdf?session_id=${sessionId}`);
            const regResult = await regResp.json();
            if (!regResp.ok) {
                alert(regResult.detail || "Gagal menghitung regresi");
                return;
            }
        } catch (err) {
            console.error(err);
            alert("Terjadi error ketika memproses data.");
        }
    };

    return (
        <div className="w-[90%] md:w-3/4 mx-auto mb-12">
            {regressionResult && (
                <TabelHasil 
                    applyKecermatan={props.applyKecermatan}  
                    regressionResult={regressionResult}
                    colDef={colDef}
                />
            )}


            {regressionResult.model != "logarithmic" && (
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col border-2 border-t-8 border-secondary my-8">
                    <div className="w-full justify-between flex items-center mb-4">
                        <p className="text-xl md:text-2xl font-bold">
                            Visualisasi Scatter Plot
                        </p>
                        <div className="flex gap-2 md:gap-4 text-white font-bold flex-wrap md:flex-nowrap text-[0.75rem] md:text-xl">
                            <button
                                onClick={handleResetZoom}
                                className="p-2 bg-primary rounded-lg hover:bg-success transition-colors duration-300 ease-in-out w-full grow"
                                type="button"
                            >
                                Reset Zoom 
                            </button>
                            <button
                                onClick={handleRefresh}
                                className="p-2 bg-secondary rounded-lg hover:bg-success transition-colors duration-300 ease-in-out w-full grow"
                                type="button"
                            >
                                Refresh Grafik 
                            </button>
                        </div>
                    </div>
                    <div ref={wrapperRef} className="w-full h-fit relative">
                        <svg ref={svgRef}></svg>
                    </div>
                </div>
            )}

            <button type="button" className="bg-linear-to-br from-primary to-secondary hover:from-secondary hover:to-primary duration-300 ease-in-out transition-colors text-white font-bold text-xl md:text-2xl p-4 rounded-xl shadow-md w-full ml-auto title-font border-secondary border" onClick={handleExport}>
                Export Hasil
            </button>
        </div>
    );
}

