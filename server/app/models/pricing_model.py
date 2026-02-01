from sqlalchemy import Integer,String,Boolean,ForeignKey,Table, Column
from sqlalchemy.orm import relationship, mapped_collection,Mapped
from datetime import datetime
from app.core.database import Base
from app.models import Products