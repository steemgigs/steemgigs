# Contributing to Steemgigs
--------------------------
:+1: :tada: First off, thanks for taking the time to contribute! :tada: :+1:

The following is a set of guidelines for contributing to Steemgigs Project which are hosted in the Steemgigs Organization account on GitHub and runs on [Steemgigs.org](https://steemgigs.org). These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request if feel anything is wrong with it. Both maintainers and owners of this project will review it.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [steemgigs and Packages](#steemgigs-and-packages)
  * [steemgigs Design Decisions](#design-decisions)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)


## Code of Conduct

This project and everyone participating in it is governed by the [Steemgigs Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [abuse@steemgigs.org](mailto:abuse@steemgigs.org).


## I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. Contact us via [discord](https://blog.steemgigs.io/2016/04/19/managing-the-deluge-of-steemgigs-issues.html) instead. You'll get faster answers that way.

We have an official [discord server]() with a moderators in each category + a help center where the community chimes in with helpful advice if you have questions.

* Even though Discord is a chat service, sometimes it takes time for community members to respond &mdash; please be patient!
    * Use the `#helpline-support` channel for general questions or discussion about Steemgigs
    * Use other relevant channels that relate to what you want to do or ask
    * There are many channels available, check the channel list

## About Steemgigs
**Please see the [ABOUT.md](https://github.com/steemgigs/steemgigs/blob/master/ABOUT.md) document to read about Steemgigs Project**

## What should I know before I get started?

>We would appreciate if you can check through our [Project board](https://github.com/steemgigs/steemgigs/projects/1) to understand our journey so far and what we need help with, what is pressing and features we would love to implement.

**"Everyone has something to offer"**, Suggestion are welcome, so if you have one, you can create an issue, so that the owner and maintainers of this project can follow it up and review your suggestions. 

This section should guide both developeer and non-developer on how they can contribute to this great project.

### For developers
Developers should please help fix bugs or implement features that are on the [Project board](We would appreciate if you can check through our [Project board](https://github.com/steemgigs/steemgigs/projects/1)). If you have a suggestion instead, please don't hesitate to create an issue for it. We will address it.

See [README.md](https://github.com/steemgigs/steemgigs/blob/master/README.md) on how to run the code.

To run the code locally,
- find this code in the head section of index.html: 
`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">` and comment it out temporarily
- locate src/services/sc2.js and modify like so
```js
import sc2 from 'sc2-sdk'

const sc = sc2.Initialize({
  baseURL: 'https://v2.steemconnect.com',
  // app: 'steemgigs.app',
  app: 'steemgig.app',
  // callbackURL: 'https://steemgigs.org/complete',
  callbackURL: 'http://localhost:8080/complete',
  scope: ['login', 'vote', 'comment', 'comment_delete', 'comment_options', 'custom_json', 'claim_reward_balance']
})

export default sc

```

- Make your changes and commit, it is advisable to make a commit each time you implement a feature.
- before making pusing your commit and making a pull request, do the following
  - test your code and be sure it works
  - ensure your modification and addition does not disrupt an existing feature
  - modify src/services/sc2.js like so
```js
import sc2 from 'sc2-sdk'

const sc = sc2.Initialize({
  baseURL: 'https://v2.steemconnect.com',
  app: 'steemgigs.app',
  // app: 'steemgig.app',
  callbackURL: 'https://steemgigs.org/complete',
  // callbackURL: 'http://localhost:8080/complete',
  scope: ['login', 'vote', 'comment', 'comment_delete', 'comment_options', 'custom_json', 'claim_reward_balance']
})

export default sc

```
  - uncomment
  - find this code in the head section of index.html: 
`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">` and be sure to uncomment it before you push

>**Note**: Though, the code structure is straight forward and self explanatory but a quick walkthrough of this project's code will soon be added.


### For deesigners

Right now we need to make the UI consitent accross the platform, we need experts in UI/UX (User experience and User Interface) to help us standardize our design by helping out with a style guide and consistent mockups that follow the style guide.

- Please take your time to read the [ABOUT.md](https://github.com/steemgigs/steemgigs/blob/master/ABOUT.md) to undertand what this project is and its goals.
- Promotional materials such as banners are also welcome

### For Content Creators
- Feel free to contribute to any part of our website where its content need to be modified
- Check our board to see where we might really need content
- Please create an issue before going ahead to create contents. Wait for an approval by a maintainer, this implies that a maintainer will need to work with you as you create the content. With this, you will be sure of the approval of the content.

### Bug Report?
Before filing a bug report
- be sure to contact us or create an issue and wait for response. We will tell you if it's a feature, we or one of our contributors are working on, or it's a feature yet to be implmented. 
- If it doesn't fall into any of the categories mentioned above, you can go ahead and file it via [utopian.io](https://utopian.io) to get a great reward for finding that bug.

### Others
- You're not a programmers but have friends that are programmers, please dont hesitate to inform them that we need help
- You could help us promote Steemgigs by telling people about it via your posts, blogs, pages, social media platforms and telling your friends about it.
- If you've got other creative ways of assisting steemgigs project, let us know via discord, we will apppreciate it. You can also create an issue, if you consider it to be a tangible contribution.