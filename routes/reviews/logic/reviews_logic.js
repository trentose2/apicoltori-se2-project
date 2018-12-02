const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    reviews_get_all : (examId, userId, taskId) => {
        if(examId == null || userId == null || isNaN(examId) || isNaN(userId)){
            throw 'Bad Request';
        }
        let results = [];
        let g = db.reviews.forEach(element => {
            if(element.exam == examId && element.user == userId){
                results.push(element);
            }
        });
        
        if((taskId != null)){
            if(isNaN(taskId)){
                throw 'Bad Request';
            }
            let h = results.forEach(element => {
                if(element.task != taskId){
                    results.pop(element);
                }
            });
        }
        return results;
    },
    reviews_create : (review) => {
        if (validate_create(review)) {
            var new_index = db.reviews.length;
            review.id = new_index;
            db.reviews.push(review);
            return review;
        } else {
            throw 'Bad Request';
        }
    }
}
function validate_create(review){
    let result = false;
    if((review != null) && (review.exam != null) && (review.user != null) && (review.task != null) && (review.response != null) && (typeof review.response === 'string')
    && (Number.isInteger(+review.exam))&& Number.isInteger(+review.user)&& Number.isInteger(+review.user)){
        if (!(_.find(db.reviews, function (o) { return review.exam == o.exam && review.user == o.user && review.task == o.task }))) {
            if (_.find(db.exams, function (o) { return review.exam == o.id })
                && _.find(db.users, function (o) { return review.user == o.id })
                && _.find(db.tasks, function (o) { return review.task == o.id })) {
                return true;
            }
        }
    }
    return result;
}