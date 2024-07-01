import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
    {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        bodyType: {
            type: String,
            required: true,
        },
        engineSize: {
            type: String,
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
        doors: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        transmission: {
            type: String,
            required: true,
        },
        fuelType: {
            type: String,
            required: true,
        },
        // furnished: {
        //     type: Boolean,
        //     required: true,
        // },
        // parking: {
        //     type: Boolean,
        //     required: true,
        // },
        // type: {
        //     type: String,
        //     required: true,
        // },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
