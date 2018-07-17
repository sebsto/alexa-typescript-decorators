/* eslint-disable  func-names */
/* eslint-disable  no-console */


import { HandlerInput, RequestHandler, ErrorHandler } from 'ask-sdk';
import { Response, SessionEndedRequest } from 'ask-sdk-model';

class LaunchRequestHandler implements RequestHandler {
  public async canHandle(handlerInput: HandlerInput): Promise<boolean> {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

class HelloWorldIntentHandler implements RequestHandler {
  public async canHandle(handlerInput: HandlerInput): Promise<boolean> {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  }
  
  public async handle(handlerInput: HandlerInput): Promise<Response> {

    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

class HelpIntentHandler implements RequestHandler {
  public async canHandle(handlerInput: HandlerInput): Promise<boolean> {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  }
  
  public async handle(handlerInput: HandlerInput): Promise<Response> {

    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

class CancelAndStopIntentHandler implements RequestHandler {
  public async canHandle(handlerInput: HandlerInput): Promise<boolean> {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  }
  
  public async handle(handlerInput: HandlerInput): Promise<Response> {

    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

class SessionEndedRequestHandler implements RequestHandler {
  public async canHandle(handlerInput: HandlerInput): Promise<boolean> {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  }
  
  public async handle(handlerInput: HandlerInput): Promise<Response> {

    console.log(`Session ended with reason: ${(<SessionEndedRequest>handlerInput.requestEnvelope.request).reason}`);

    return handlerInput.responseBuilder.getResponse();
  }
};

class SkillErrorHandler implements ErrorHandler {
  public async canHandle(handlerInput: HandlerInput): Promise<boolean> {
    return true;
  }
  
  public async handle(handlerInput: HandlerInput, error : Error): Promise<Response> {

    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  }
};

import * as Alexa from 'ask-sdk-core';
const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    new LaunchRequestHandler(),
    new HelloWorldIntentHandler(),
    new HelpIntentHandler(),
    new CancelAndStopIntentHandler(),
    new SessionEndedRequestHandler()
  )
  .addErrorHandlers(new SkillErrorHandler())
  .lambda();

export { handler }

  // export function intent(name : string) : (target: Object, propertyKey: string, descriptor:PropertyDescriptor) => PropertyDescriptor {}
