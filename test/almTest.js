import { expect } from 'chai';
import AlmService from './services/alm.service';

let articleId = 16368017;
let cookie;
let participantId;
let request = {
    "username": "seleniumUatOOOCreate1@mailinator.com",
    "password": "123456Test",
    "externalLogin": false
};
let articleName = "Selenium-OO-Test-2020-11-20WATuWIwyxK";
let journalId = "8096251";

describe('ALM API service', () => {
    it('Authenticate User', (done) => {
        AlmService.authenticateApi(request)
            .then(data => {
                cookie = data.headers["set-cookie"];
                participantId = data.data.payload.participantId;
                expect(data.status).to.equal(200)
                expect(data.data.status).to.equal("SUCCESS")
                return done()
            })
            .catch(err => done(err))
    })

    it('Get article details', (done) => {
        AlmService.getArticleDetails(articleId, cookie)
            .then(data => {
                expect(data.status).eql(200)
                expect(data.data.status).to.equal("SUCCESS")
                expect(data.data.payload.article.name).to.equal(articleName)
                expect(data.data.payload.journal.id).to.equal(journalId)
                return done();
            })
            .catch(err => done(err))
    })

    it('Get relationship with article', (done) => {
        AlmService.getRelationshipWithArticle(articleId, cookie)
            .then(data => {
                expect(data.status).to.equal(200);
                let contents = data.data.content;
                contents.forEach(object => {
                    expect(object.participantId).to.equal(participantId)
                    expect(object.attributes[2].attributeValue).to.equal(request.username)
                });
                return done();
            })
            .catch(err => done(err))
    })
})