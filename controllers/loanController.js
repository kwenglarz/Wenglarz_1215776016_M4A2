const customerLoan = require('../models/loanModel');
const APIFeatures = require('./../dataBaseManager/loanDbContext');

exports.getLoan = async (req, res) => {
    // get data from database
    const customerloan = await customerLoan.find()
    res.status(200).json({
        status: 'Success',
        results: customerloan.length,
        data: {
            customerloan
        }
    })
    // res.send(`Hello World from customerloan GET ${JSON.stringify(data)}`);
};

exports.getLoanById = async (req, res) => {
    // get particular loan details from database
    const { id } = req.params;
    const customerloan = await customerLoan.find({ _id: id });
    res.status(200).json({
        status: 'Success',
        results: customerloan.length,
        data: {
            customerloan
        }
    });
};

exports.getAllLoans = async (req, res) => {
    try {
        // EXECUTE QUERY
        const features = new APIFeatures(customerLoan.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const customerloan = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: customerloan.length,
            data: {
                customerloan
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createLoan = async (req, res) => {
    const newLoan = req.body;
    const dateTime = new Date().toISOString();
    
    // const date = new Date();
    // console.log(`DateTime is ${datetime}`);
    // let day = date.getDate()
    // let month = date.getMonth() + 1
    // let year = date.getFullYear()
    // let hour = date.getHours(),
    // min = date.getMinutes(),
    // sec = date.getSeconds()
    // let fullDate = `${month}-${day}-${year} ${hour}:${min}:${sec}`
    //console.log(fullDate) 
    
    const newcustomerLoan = {...newLoan, createdDate: dateTime, insertedDate: dateTime};
    
    try {
        const customerloan = await customerLoan.create(newcustomerLoan)
        res.status(201).json({
            status: 'Success',
            data: customerloan
        });
        //res.send('Hello World from customerloan POST');
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.updateLoanById = async (req, res) => {
    try {
        const customerloan = await customerLoan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                customerloan
            }
        });
        //res.send('Hello World from customerloan UpdateByLoanId');
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteLoanById = async (req, res) => {
    try {
        await customerLoan.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
        //res.send('Hello World from customerloan DELETE');
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// NEW FUNCTIONALITY
// Route gets the loan for a customer by name
exports.getCustomerLoanFromName = async (req, res) => {
    // get particular loan details for customer name from database
    const { id } = req.params;
    const customerloan = await customerLoan.find({ customerName: id });
    res.status(200).json({
        status: 'Success',
        results: customerloan.length,
        data: {
            customerloan
        }
    });
};
