from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload_routes import router as upload_router
from routes.regression_routes import router as regression_router
from routes.chatbot_routes import router as chatbot_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Regression API",
    description="API untuk regresi linear & logaritmik + grafik + PDF",
    version="1.0.0"
)

# ========================
# CORS Middleware
# ========================
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # ==== DOMAIN HOSTING FRONTEND ====
    "http://18.143.139.126",
    "https://18.143.139.126",
    "http://reglab.cyou",
    "https://reglab.cyou",
    "http://www.reglab.cyou",
    "https://www.reglab.cyou",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========================
# Include Routers
# ========================
app.include_router(upload_router, prefix="/api/upload")
app.include_router(regression_router, prefix="/api/regression")
app.include_router(chatbot_router, prefix="/api/chat")

