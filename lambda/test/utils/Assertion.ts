'use strict';

import { ResponseEnvelope, ui } from 'ask-sdk-model'
import { expect, should } from 'chai';

export class Assertion {

    checkResponseStructure(response: ResponseEnvelope): void {
        expect(response).to.have.property("version");
        expect(response.version).to.be.equal("1.0");
        expect(response).to.have.property("response");
    }

    checkOutputSpeach(response: ResponseEnvelope): void {

        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.have.property("outputSpeech");
        expect(r.outputSpeech).to.have.property("type");
        expect(r.outputSpeech.type).to.equal('SSML');
        expect(r.outputSpeech).to.have.property("ssml");

        let os = <ui.SsmlOutputSpeech>r.outputSpeech;

        expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
        expect(os.ssml).to.match(/<\/speak>$/); //.endWith('</speak>');
    }

    checkOutputSpeachContains(response: ResponseEnvelope, skillName: string): void {

        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.have.property("outputSpeech");
        expect(r.outputSpeech).to.have.property("type");
        expect(r.outputSpeech.type).to.equal('SSML');
        expect(r.outputSpeech).to.have.property("ssml");

        let os = <ui.SsmlOutputSpeech>r.outputSpeech;
        expect(os.ssml).to.contains(skillName);
        expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
        expect(os.ssml).to.match(/<\/speak>$/); //.endWith('</speak>');
    }

    checkSessionStatus(response: ResponseEnvelope, shouldEndSession: boolean): void {
        let r = response.response;
        expect(r).to.have.property("shouldEndSession");
        if (shouldEndSession) {
            expect(r.shouldEndSession).to.be.true;
        } else {
            expect(r.shouldEndSession).to.be.false;
        }
    }

    checkReprompt(response: ResponseEnvelope): void {
        expect(response).to.have.property("response");
        let r = response.response;

        expect(r).to.have.property("reprompt");
        expect(r.reprompt).to.have.property("outputSpeech");
        expect(r.reprompt.outputSpeech).to.have.property("type");
        expect(r.reprompt.outputSpeech.type).to.equal('SSML');
        expect(r.reprompt.outputSpeech).to.have.property("ssml");
        let os = <ui.SsmlOutputSpeech>r.reprompt.outputSpeech;
        expect(os.ssml).to.match(/^<speak>/); // startWith('<speak>');
        expect(os.ssml).to.match(/<\/speak>$/); //.endWith('</speak>');

    }

    checkNoReprompt(response: ResponseEnvelope): void {
        expect(response).to.have.property("response");
        let r = response.response;
        expect(r).to.not.have.property("reprompt");
    }
}