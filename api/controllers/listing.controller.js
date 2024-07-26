import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef) {
        return next(
            errorHandler(401, 'You can only delete your own listings!')
        );
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next(
            errorHandler(401, 'You can only update your own listings!')
        );
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let transmission = req.query.transmission;

        if (transmission === undefined || transmission === 'allTransmission') {
            transmission = { $in: ['automatic', 'manual', 'cvt', 'others'] };
        }

        let fuelType = req.query.fuelType;

        if (fuelType === undefined || fuelType === 'allFuelType') {
            fuelType = { $in: ['diesel', 'gasoline'] };
        }

        let bodyType = req.query.bodyType;

        if (bodyType === undefined || bodyType === 'allBodyType') {
            bodyType = {
                $in: [
                    'Sedan',
                    'Hatchback',
                    'SUV',
                    'MPV/MUV',
                    'Van',
                    'Crossover',
                    'Pickup',
                    'Hybrid',
                    'Sports Car',
                    'Others',
                ],
            };
        }

        let price = req.query.price;

        if (price === 'Under 250,000') {
            price = { $lt: 250000 };
        }
        if (price === 'Under 500,000') {
            price = { $lt: 500000 };
        }
        if (price === 'Under 750,000') {
            price = { $lt: 750000 };
        }
        if (price === 'Under 1,000,000') {
            price = { $lt: 1000000 };
        }
        if (price === 'Under 3,000,000') {
            price = { $lt: 3000000 };
        }
        if (price === undefined || price === 'AllPrice') {
            price = { $gte: 1 };
        }

        const searchTerm = req.query.searchTerm || '';
        const modelSearch = req.query.modelSearch || '';

        const sort = req.query.sort || 'price';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            make: { $regex: searchTerm, $options: 'i' },
            model: { $regex: modelSearch, $options: 'i' },
            transmission,
            fuelType,
            bodyType,
            price,
        })
            .sort({
                [sort]: order,
            })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};
