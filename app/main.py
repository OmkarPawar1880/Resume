from fastapi import FastAPI
from app.api.resume import router as resume_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="CreateResume API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(resume_router)
