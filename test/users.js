import { expect } from 'chai';
import UserApiService from "./services/users.service";

describe('User API service', () => {
    it('get Users', (done) => {
        UserApiService.getUsers()
        .then(data => {
            expect(data.data.code).eql(200)
            return done()
        })
        .catch(err => done(err))
    })

    it('post User', (done) => {
        let randomNo = Math.random()
        let data = {
            "email": `andun${randomNo}@google.com`,
            "name": "Andun",
            "gender": "Male",
            "status": "Active"
        }
        UserApiService.postUser(data)
        .then(data => {
            expect(data.data.code).eql(201)
            return done()
        })
        .catch(err => done(err))
    })
})