const { Schema, model } = require('mongoose');

const JobsSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    offerStartDate: {
        type: String,
        required: true,
    },
    offerEndDate: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    ratePerHour: {
        type: Number
    },
    tools: {
        type: [
            { type: String }
        ],
        required: true
    },
    disciplines: {
        type: [
            { type: String }
        ],
        required: true
    },
    jobDescription: {
        type: String
    },
    jobType: {
        type: String
    },
    location: {
        type: String
    },
    createUser: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    applicantUser: {
        type: [
            { type: Schema.Types.ObjectId }
        ],
        ref: 'Users',
    },
});

JobsSchema.method('toJSON', function() {
    const {__v, _id, ...object } = this.toObject();
    object.id= _id;
    return object;
});

module.exports = model('Jobs', JobsSchema);
