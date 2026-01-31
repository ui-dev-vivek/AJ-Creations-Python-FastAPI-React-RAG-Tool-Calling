
from sqlalchemy import (
    String, Boolean, DateTime, ForeignKey, Table, Column
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    mobile: Mapped[str] = mapped_column(String(10), unique=True, index=True)
    email: Mapped[str | None] = mapped_column(String(255), unique=True)
    username: Mapped[str | None] = mapped_column(String(255), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    is_active: Mapped[bool] = mapped_column(default=True)
    is_verified: Mapped[bool] = mapped_column(default=False)

    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # Relationships
    profile: Mapped["Profile"] = relationship(
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    roles: Mapped[list["Role"]] = relationship(
        secondary=user_roles,
        back_populates="users"
    )

    addresses: Mapped[list["Address"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )


class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String(255))

    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    users: Mapped[list["User"]] = relationship(
        secondary=user_roles,
        back_populates="roles"
    )

    permissions: Mapped[list["Permission"]] = relationship(
        secondary=role_permissions,
        back_populates="roles"
    )


class Permission(Base):
    __tablename__ = "permissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(String(100), unique=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String(255))

    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    roles: Mapped[list["Role"]] = relationship(
        secondary=role_permissions,
        back_populates="permissions"
    )


user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("role_id", ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
)

role_permissions = Table(
    "role_permissions",
    Base.metadata,
    Column("role_id", ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
    Column("permission_id", ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True),
)


class Session(Base):
    __table__="sessions"

    id: Mapped[int] = mapped_column(primary_key=True,unique=True,index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False,index=True)
    refresh_token: Mapped[str] = mapped_column(String,nullable=True)
    user_agent: Mapped[str] = mapped_column(String,nullable=True)
    expires_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

class PasswordReset(Base):
    __tablename__ = "password_resets"

    id: Mapped[int] = mapped_column(primary_key=True, unique=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    reset_token: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    used_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)



class LoginAuditLog(Base):
    __tablename__ = "login_audit_logs"

    id: Mapped[int] = mapped_column(primary_key=True, unique=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    email: Mapped[str] = mapped_column(String, nullable=True)
    mobile: Mapped[str] = mapped_column(String, nullable=True)
    ip_address: Mapped[str] = mapped_column(String, nullable=True)
    user_agent: Mapped[str] = mapped_column(String, nullable=True)
    status: Mapped[str] = mapped_column(String, nullable=False)
    failure_reason: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)




class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True
    )

    first_name: Mapped[str | None] = mapped_column(String(255))
    last_name: Mapped[str | None] = mapped_column(String(255))
    bio: Mapped[str | None] = mapped_column(String(500))

    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow, onupdate=datetime.utcnow
    )

    user: Mapped["User"] = relationship(back_populates="profile")


class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )

    type: Mapped[str] = mapped_column(String(10))  # home, office
    address_line1: Mapped[str] = mapped_column(String(255))
    address_line2: Mapped[str | None] = mapped_column(String(255))
    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str] = mapped_column(String(100))
    pincode: Mapped[str] = mapped_column(String(20))

    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="addresses")

