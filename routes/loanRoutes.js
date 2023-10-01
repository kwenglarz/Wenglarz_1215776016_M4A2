const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.route('/')
    .get(loanController.getAllLoans)
    .post(loanController.createLoan)

router.route('/:id')
    .get(loanController.getLoanById)
    .patch(loanController.updateLoanById)
    .put(loanController.updateLoanById)
    .delete(loanController.deleteLoanById);

// NEWLY ADDED ROUTE
router.route('/customer/:id')
    .get(loanController.getCustomerLoanFromName)

module.exports = router;