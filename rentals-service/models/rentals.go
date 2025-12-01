package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Rental struct {
	ID                primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name              string             `json:"name" bson:"name"`
	Image             string             `json:"image" bson:"image"`
	Category          string             `json:"category" bson:"category"`
	RentalPricePerDay int                `json:"rentalPricePerDay" bson:"rentalPricePerDay"`
	Availability      bool               `json:"availability" bson:"availability"`
	Provider          string             `json:"provider" bson:"provider"`
}
