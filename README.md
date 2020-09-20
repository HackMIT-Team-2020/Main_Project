# Notention
Do you ever feel like sometimes, even after putting in lots of hard work, you still struggle to retain certain concepts? Do you ever feel overwhelmed and don't know how to start studying because things are difficult to organize? To help students optimize their study routine, we have created Notention.
Notention is a handwritten note-taking webapp with built-in spaced repetition, designed to help students remember the contents of their notes in a simple yet effective way.

## Demo

Go [here](http://96.30.198.242:3000/) to test out Notation.
Go [here](https://www.youtube.com/watch?v=hSGwJLKOWRA) to watch the video demo

## Inspiration
Often, it is difficult for students to study their notes in an effective manner due to disorganization and lack of ability to optimize their study time and their position on the "forgetting curve". This problem is exacerbated in quarantine for online classes, where there is an overall lack of structure in students' days. We wanted to Notention aims to improve this situation by providing students with a resource that allows them to optimize their study routine by automatically generating a study schedule based on scientific models for each note they take.

## What it does
The user can create handwritten notes which can be edited later. These notes are automatically parsed if the user decides to add this to their quiz schedule, and the user is asked to verify the parsed notes. Square brackets should be put around important terms that the user would like to be quizzed about. Once submitted, the quiz is put on a schedule, and depending on how well the user does on each quiz, the quiz is scheduled again for a future time, based on scientific models of the forgetting curve. The user can also view their progress on each note.

## How we built it
With our vision of making studying simpler for students in mind, we designed a wireframe mockup of Notention’s flow and its look and feel in Adobe XD; we created our logo in Adobe Illustrator. For the backend, we used Node.js with Express, the [Google Vision API](https://cloud.google.com/vision), and lowdb; in the frontend, we used HTML, CSS, JQuery with some Bootstrap, the [Sketchpad](https://github.com/yiom/sketchpad) library, and a [JQuery Modal](https://jquerymodal.com/) library. But, most importantly, we built Notention with lots of love.

## Challenges we faced
Spaced repetition can be implemented in many ways and we had to figure out a model that would work for as many people as possible while still being customizable for individual review scores. Manipulating HTML elements in unnatural ways using CSS is always a challenge. For example, input[type=color] is not meant to be circle shaped. Thus, we had to hide that input and place a span in it's place and then use jQuery to maintain functionality. By mining for information on Google, we unleashed CSS magic and bended elements till they conformed to what was shown on the AdobeXD mockup

## Accomplishments we're proud of
We've built something that each of us as individuals would find useful and use and hope that other people find the project as useful as we do!

## What's next?
We see a large scope for expansion, from integration with google calendars to a mobile version of Notention.
