const submission_logic = require('./submissions_logic.js');
const db = require('../../../db/db.js');

db.exams.push({ id: 0 })
db.users.push({ id: 0 })
db.tasks.push({ id: 0 })
db.tasks.push({ id: 1 })

describe('Test create submissions', () => {
    test('validation_create_submission', () => {
        let submission = { exam: 0, user: 0, task: 0, response: "response" };
        expect(submission_logic.validation_create_submission(submission)).toBe(true);
    });

    test('Add invalid submissions', () => {
        function addnull() {
            return submission_logic.submission_create(null);
        }
        expect(addnull).toThrow();

        function addstring() {
            return submission_logic.submission_create("prova");
        }
        expect(addstring).toThrow();

        function addinvalidint() {
            let submission = { exam: "null", user: "ciao", task: "n", response: "cc" }
            return submission_logic.submission_create(submission)
        }
        expect(addinvalidint).toThrow();

        function addinvalidstring() {
            let submission = { exam: 0, user: 0, task: 0, response: 32 }
            return submission_logic.submission_create(submission)
        }
        expect(addinvalidstring).toThrow();
    });

    test('Add submissions with invalid reference ', () => {

        function addwrongexam() {
            let submission = { exam: 222, user: 0, task: 0, response: "ciao" }
            return submission_logic.submission_create(submission);
        }
        expect(addwrongexam).toThrow();

        function addwronguser() {
            let submission = { exam: 0, user: 222, task: 0, response: "ciao" }
            return submission_logic.submission_create(submission);
        }
        expect(addwronguser).toThrow();

        function addwrongtask() {
            let submission = { exam: 0, user: 0, task: 222, response: "ciao" }
            return submission_logic.submission_create(submission);
        }
        expect(addwrongtask).toThrow();
    });

    test('Add valid submission ', () => {
        db.exams.push({ id: 0 })
        db.users.push({ id: 0 })
        db.tasks.push({ id: 0 })

        let submission = { exam: 0, user: 0, task: 0, response: "response" };
        let added = submission_logic.submission_create(submission);

        expect(typeof (added)).toBe('object');
        expect(added.id).toBe(db.submissions.length - 1);
    });
}),

    describe('Test Retrieve a submission', () => {
        test('Retrieve a submission that not exits or by wrong value', () => {
            function getnull() {
                return submission_logic.submission_get_by_id(null)
            }
            expect(getnull).toThrow('Bad Request');

            function getnotint() {
                expect(submission_logic.submission_get_by_id('ciao')).toThrow();
            }
            expect(getnotint).toThrow('Bad Request');

            function getintnotvalue() {
                expect(submission_logic.submission_get_by_id(-23)).toThrow();
            }
            expect(getintnotvalue).toThrow('Not Found');

        });

        test('Retrieve a submission that exits', () => {

            let result = submission_logic.submission_get_by_id(0);
            expect(result.id).toBe(0);
            expect(result.exam).toBe(0);
            expect(result.user).toBe(0);
            expect(result.response).toBe("response");

            db.submissions.push({ id: 1, exam: 0, user: 0, task: 1, response: "ciao" })

            result = submission_logic.submission_get_by_id(1);
            expect(result.id).toBe(db.submissions.length - 1);
            expect(result.exam).toBe(0);
            expect(result.user).toBe(0);
            expect(result.response).toBe("ciao");
        });
    });

describe('Test delete submission', () => {
    //Error
    test('wrong value to delete a submission', () => {
        expect(() => { submission_logic.sumbission_delete(null) }).toThrow('Bad Request');

        expect(() => { submission_logic.sumbission_delete('ciao') }).toThrow('Bad Request');
    })

    test('Delete a submission that not exists', () => {
        expect(submission_logic.sumbission_delete(-2)).toBe(false);

        expect(submission_logic.sumbission_delete(123)).toBe(false);
    })

    //Not Error
    test('Correct delete of a submission', () => {
        expect(submission_logic.sumbission_delete(0)).toBe(true);

        expect(submission_logic.sumbission_delete(1)).toBe(true);
    })
});