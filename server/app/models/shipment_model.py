from sqlalchemy import BigInteger, String, ForeignKey, DateTime, Date, Time, Boolean, Enum as SqlEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from datetime import datetime, date, time
from enum import Enum


class ShipmentStatus(str, Enum):
    packed = "packed"
    shipped = "shipped"
    delivered = "delivered"


class TrackingEventStatus(str, Enum):
    packed = "packed"
    shipped = "shipped"
    in_transit = "in_transit"
    delivered = "delivered"


class Carrier(Base):
    __tablename__ = "carriers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    tracking_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # One to Many
    shipments: Mapped[list["Shipment"]] = relationship("Shipment", back_populates="carrier")


class Shipment(Base):
    __tablename__ = "shipments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    carrier_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey("carriers.id", ondelete="SET NULL"), nullable=True, index=True)
    status: Mapped[str] = mapped_column(SqlEnum(ShipmentStatus), nullable=False, default=ShipmentStatus.packed)
    shipped_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Many to One
    carrier: Mapped["Carrier | None"] = relationship("Carrier", back_populates="shipments")

    # One to Many
    items: Mapped[list["ShipmentItem"]] = relationship("ShipmentItem", back_populates="shipment", cascade="all, delete-orphan")
    tracking_events: Mapped[list["TrackingEvent"]] = relationship("TrackingEvent", back_populates="shipment", cascade="all, delete-orphan")


class ShipmentItem(Base):
    __tablename__ = "shipment_items"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    shipment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("shipments.id", ondelete="CASCADE"), nullable=False, index=True)
    order_item_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("order_items.id", ondelete="CASCADE"), nullable=False, index=True)
    quantity: Mapped[int] = mapped_column(nullable=False)

    # Many to One
    shipment: Mapped["Shipment"] = relationship("Shipment", back_populates="items")


class TrackingEvent(Base):
    __tablename__ = "tracking_events"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    shipment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("shipments.id", ondelete="CASCADE"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(SqlEnum(TrackingEventStatus), nullable=False)
    location: Mapped[str | None] = mapped_column(String(500), nullable=True)
    occurred_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Many to One
    shipment: Mapped["Shipment"] = relationship("Shipment", back_populates="tracking_events")


class DeliverySlot(Base):
    __tablename__ = "delivery_slots"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    date: Mapped[date] = mapped_column(Date, nullable=False)
    start_time: Mapped[time] = mapped_column(Time, nullable=False)
    end_time: Mapped[time] = mapped_column(Time, nullable=False)
    is_available: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
