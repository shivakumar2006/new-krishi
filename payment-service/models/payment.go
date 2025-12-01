package models

type Item struct {
	Title    string  `json:"title"`
	Price    float64 `json:"price"`
	Quantity int64   `json:"quantity"`
}

type CheckoutRequest struct {
	Items []Item `json:"items"`
}
