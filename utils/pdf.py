from reportlab.pdfgen import canvas

def generate_pdf(df, params, chart_path, model):
    output_path = f"uploads/{model}_result.pdf"

    c = canvas.Canvas(output_path)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, 820, f"Hasil Regresi: {model.capitalize()}")

    c.setFont("Helvetica", 12)
    c.drawString(50, 795, f"Persamaan: {params['equation']}")

    # Grafik
    c.drawImage(chart_path, 50, 450, width=500, height=300)

    # Preprocessing
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, 420, "Preprocessing:")
    y = 400
    c.setFont("Helvetica", 11)
    for step in params["preprocessing_report"]:
        c.drawString(70, y, "- " + step)
        y -= 18

    # Rincian perhitungan
    y = y - 20
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y, "Rincian Perhitungan:")
    y -= 20

    c.setFont("Helvetica", 10)
    for line in params["details"]:
        c.drawString(70, y, line)
        y -= 16
        if y < 50:
            c.showPage()
            y = 800
            c.setFont("Helvetica", 10)

    c.save()
    return output_path
