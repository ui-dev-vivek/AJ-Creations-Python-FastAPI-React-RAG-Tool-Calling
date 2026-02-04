from app.core.database import engine, Base
from app.core.db_base import *  # Import all models

# Create all tables
Base.metadata.create_all(bind=engine)
print("✓ Successfully created all database tables!")
