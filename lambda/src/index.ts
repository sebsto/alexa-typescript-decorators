/* eslint-disable  func-names */
/* eslint-disable  no-console */


import { HandlerInput } from 'ask-sdk';
import { Response, SessionEndedRequest, IntentRequest } from 'ask-sdk-model';

import * as Alexa from 'ask-sdk-core';
const skillBuilder : Alexa.CustomSkillBuilder = Alexa.SkillBuilders.custom();

/**
 * These are the decorator definition, ideally these should be added to
 * the Alexa SDK 
 */

//=============================================================================
interface Handler {
  handle(handlerInput: HandlerInput): Promise<Response>;
}
interface ErrorHandler {
  handle(handlerInput: HandlerInput, error : Error): Promise<Response>;
}

function launchrequest<T extends Handler>(target: new() => Handler) : void { 

  const matcher = (handlerInput: HandlerInput) : boolean => {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  }
  const executor = target.prototype.handle;
  skillBuilder.addRequestHandler(matcher, executor);
}

function sessionended<T extends Handler>(target: new() => Handler) : void { 

  const matcher = (handlerInput: HandlerInput) : boolean => {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  }
  const executor = target.prototype.handle;
  skillBuilder.addRequestHandler(matcher, executor);
}

function intent(name: string[]) { // this is the decorator factory
  return <T extends Handler>(target: new() => Handler) : void => { 

    const matcher = (handlerInput: HandlerInput) : boolean => {
          let match : boolean = false;
          for (const n of name) {
            match = match || (<IntentRequest>handlerInput.requestEnvelope.request).intent.name === n ;
          }
          return handlerInput.requestEnvelope.request.type === 'IntentRequest' && match;
    }
    const executor = target.prototype.handle;
    skillBuilder.addRequestHandler(matcher, executor);    
  }
}

function error(name?: string[]) { // this is the decorator factory
  return <T extends ErrorHandler>(target: new() => ErrorHandler) : void => { 

    const matcher = (handlerInput: HandlerInput, error: Error) : boolean => {
          let match : boolean = false;
          if (name) {
            for (const n of name) {
              match = match || error.name.startsWith(n) ;
            }  
          } else {
            match = true;
          }
          return handlerInput.requestEnvelope.request.type === 'IntentRequest' && match;
    }
    const executor = target.prototype.handle;
    skillBuilder.addErrorHandler(matcher, executor);    
  }
}

//=============================================================================


@launchrequest
class LaunchRequestHandler implements Handler {

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
}

@intent(['HelloWorldIntent'])
class HelloWorldIntentHandler implements Handler {

  public async handle(handlerInput: HandlerInput): Promise<Response> {

    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

@intent(['AMAZON.HelpIntent'])
class HelpIntentHandler implements Handler {

  async handle(handlerInput: HandlerInput): Promise<Response> {

    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

@intent(['AMAZON.CancelIntent', 'AMAZON.StopIntent'])
class CancelAndStopIntentHandler implements Handler {
  async handle(handlerInput: HandlerInput): Promise<Response> {

    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

@sessionended
class SessionEndedRequestHandler implements Handler {
  public async handle(handlerInput: HandlerInput): Promise<Response> {
    console.log(`Session ended with reason: ${(<SessionEndedRequest>handlerInput.requestEnvelope.request).reason}`);
    return handlerInput.responseBuilder.getResponse();
  }
}

@error()
class SkillErrorHandler implements ErrorHandler {  
  async handle(handlerInput: HandlerInput, error : Error): Promise<Response> {

    console.log(`Error handled: ${error.message}`);
    console.log(error);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  }
};

const handler = skillBuilder.lambda();
export { handler }
