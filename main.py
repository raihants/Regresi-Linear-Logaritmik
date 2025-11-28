from fastapi import FastAPI
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

app.include_router(upload_router, prefix="/api/upload")
app.include_router(regression_router, prefix="/api/regression")
app.include_router(chatbot_router, prefix="/api/chat")