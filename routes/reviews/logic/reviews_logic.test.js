const reviews_logic = require ('./reviews_logic.js');
const db = require('../../../db/db.js');

//valid eq. classes
test('Retrive valid reviews with all input ', () => {
    db.exams.push({id: 2})
    db.users.push({id: 2})
    db.tasks.push({id: 2})

    db.reviews.push({examId: 2, userId: 2, taskId: 2});

    let results = reviews_logic.reviews_get_all(2,2,2);
    expect(Array.isArray(results)).toBe(true);
    
    expect(results.length).toBe(1);

    let correct = true;
    results.forEach(element => {
        if(!(element.examId == 2 && element.userId == 2 && element.taskId == 2)){
            correct = false;
        }
    });
    expect(correct).toBe(true);

});
test('Retrive valid reviews with input required ', () => {
    let results = reviews_logic.reviews_get_all(2,2);
    expect(Array.isArray(results)).toBe(true);
    
    expect(results.length).toBe(1);

    let correct = true;
    results.forEach(element => {
        if(!(element.examId == 2 && element.userId == 2)){
            correct = false;
        }
    });
    expect(correct).toBe(true);

});
test('Create valid review ', () => {

    let review = {examId: 1, userId: 1, taskId: 1}
    let added = reviews_logic.reviews_create(review);

    expect(added).not.toBeUndefined();
    expect(added).not.toBeNull();
    expect(added.id).toBe(db.reviews.length - 1);

});
//invalid eq. classes 
test('Retrive invalid reviews ', () => {
    expect(() => {reviews_logic.reviews_get_all(null, null)}).toThrow();

    expect(() => {reviews_logic.reviews_get_all("string", "string", "string")}).toThrow();

});
test('Retrive invalid reviews with parameters not found', () => {

    expect(() => {reviews_logic.reviews_get_all(1, 1, 1)}).toThrow();

    expect(() => {reviews_logic.reviews_get_all(0, 1, 1)}).toThrow();

    expect(() => {reviews_logic.reviews_get_all(1, 0, 1)}).toThrow();

    expect(() => {reviews_logic.reviews_get_all(1, 1, 0)}).toThrow();

});
test('Create invalid review ', () => {
    expect(() => {reviews_logic.reviews_create(null)}).toThrow();

    let review = {exam: "string", user: "string", task: "string"}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();

    review = {exam: 0, task: 0}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();

    review = {user: 0, task: 0}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();

});