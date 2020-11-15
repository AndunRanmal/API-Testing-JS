import axios from "axios";
import { expect } from "chai";
import UserApiService from "./services/users.service";

const URL = "https://gorest.co.in/public-api/users";
const TOKEN = "Bearer 5aa8220420419fd5890bb88a1767ed7cb1abc4412024bfff91513a40d6e19823";

describe('User API service', () => {
    it('get Users', (done) => {
        UserApiService.getUsers()
        .then(data => {
            expect(data.status).eql(200)
            return done()
        })
        .catch(err => done(err))
    })

    it('post User', (done) => {
        let data = {
            "email": "andun@google.com",
            "name": "Andun",
            "gender": "Male",
            "status": "Active"
        }

        axios.post(URL, {
            headers: {
                Authorization: TOKEN
            },
            data: data
        })
            .then(data => {
                expect(data.status).eql(200)
                return done();
            })
            .catch(err => done(err))

    })
})