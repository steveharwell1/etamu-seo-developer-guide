# UI/UX Testing Process
## Key opportunities for testing.
- Information architecture for intranet
- Take name change opportunity to improve our brand alignment through semantic testing
- use [Post Launch](#post-launch) loop to improve current site

## General advice.
- Most sites are already established. Use the post-launch improvement loop to continually improve your site.
- Setup 3 people to come in every month on the same day to be available for tests.
- Real users are always best.
    - Usability testing just needs someone of the same cognitive and physical abilities as the audience.
    - Visuals and tone really need to test the target audience.
    - While good for interviews about users, employees are bad for testing existing designs.
    - Friends and family are great for testing until they get too familiar with your designs.
- Preference tests are great for testing competitors or design options because it shows brand alignment rather than just preference. Maybe should be called alignment test.
- Testing a wireframe is low reward since content and design create the message. No content, no message.

### Cool testing sites with free trials
- https://www.lyssna.com/
- https://maze.co/
- https://uxmetrics.com/
- https://www.lookback.com/
- https://www.pollfish.com/


## Milestones / Phases
- **Basic research**: Understand basic user behavior, how they interact with our business and how they perceive the business.
- **Discovery**: Goal is to understand user needs.  Greenfield projects can be tested against competitors.
- **Post-launch**: Testing after launch allows you to observe natural behavior which is hard with other tests. It's also easier to measure improvements.
- **Project start**: Ensure you know what the potential issues are for a project by testing existing elements for a redesign, or prototype/competitor for a greenfield project.
- **Prototype**: This is a pre-launch phase named for it's main product. Test prototypes with usability tests. These test can be used to create high a low light reels which go to stakeholder or in presentations. Issues discovered in this phase should be prioritized by user impact, business impact and effort
- **Content Architecture**: Site navigation elements and site map
- **Aesthetic/style development**: Testing understanding and brand alignment.

## Definitions
### Low Performance

  Pages with high bounce rates, exits, rage clicks,
  dead clicks, excessive scroll or quick backs.
  More weight will be given to pages with 
  high volume, key user journey steps, and strategic value.

### Small Change
  Changing text, buttons or images.

### Complex Change
  - Change the necessitates testing different multi-page flows,
  or a single page layout change that necessitates A/B testing a single page via redirect.
  - Complex changes like detailed interactions
  - Costly builds

### Tasks
  Things people need to do, information they need to find, and questions they need answered.

## Type of tests
- **Usability** facilitated, [unfacilitated](https://lookback.io), remote, in-person
- **AB/Multivariate** [Convert](https://convert.com), [Crazyegg](https://crazyegg.com), [Hello](https://helio.app/)
- **Survey**
  - **Semantic Survey** - [Lyssna](https://www.lyssna.com/) Ligert for testing a brand word and antonym. Closed word association; open word association; test competitors "which site is more 'personal'";
  - **Preference test** - [Lyssna](https://www.lyssna.com/) Use with larger sample size. Example: Which of the following do you associate with _insert brand keyword_;
- **First click analysis**
- **5 second test** [Lyssna](https://www.lyssna.com/) Produces a word cloud; Involves showing users the design for only five seconds, after which they are asked to recall specific details or first impressions, assessing the clarity and effectiveness of its visual communication.**
- **Full User Interview** Can be expensive. Can result in smaller test size. Can see non-verbal language. Can ask follow up questions.
- **Top task analysis** [Poll Unit](https://pollunit.com/en) Brainstorm task with interviews.(Can also skip brainstorming through ChatGPT) Create a poll for current tasks and solicit other tasks ideas. Clean data by merging dupes. Top 1/3 of tasks are your top tasks.
- **Open card sorting** [UXMetrics](https://uxmetrics.com/) Use to build top-level navigation around the top tasks
- **Closed card sorting** [UXMetrics](https://uxmetrics.com/) Helps create subsections by asking people to sort sub-tasks under main sections.
- **Tree Testing** [UXMetrics](https://uxmetrics.com/) Task based test for used for the later part of designing menus or journey flows.

## Decision process pseudo code
Consider the phase of development
  - [Basic research](#basic-research)
  - [Discovery](#discovery)
  - [Information Architecture](#information-architecture)
  - [Aesthetic/Style Development](#aesthetics)
  - [Prototyping](#prototyping)
  - [Post-Launch](#post-launch)

### Basic Research
  - segment and create profiles for each user type. Group users not by demographics, but by common tasks.
  - Interview user-facing employees and users themselves. Consider user needs, business mission and growth model (virtuous cycle) to establish stages of the user journey.
    - Preserve quotes, highlights and low-lights for use in presentations.
    - Alternatively host and user journey workshop. Invite end users, customer facing staff, those with data, and executive sponsors.
  - For each stage of the user journey establish.
      - tasks
      - questions
      - forms of interaction (phone, website, email, social)
      - emotions
      - influences (helpers and advocates)
      - company weaknesses

### Discovery
Perform usability testing to test retiring designs, or competitors.
  - Determine user needs and current design weaknesses.
  - Ensure the new design is viable. By answering these questions.
    - Do they get it?
    - Have we discovered the major issues?
    - Have we verified potential solutions?
    - Should we continue the project?
      - Goto prototyping

### Post Launch
for pages with low performance diagnose the problem with:
    - heatmaps
    - session recordings
    - stakeholder interview
    - 1-question survey on exit intent
    - 5 second test
    - Usability test

Propose 1 or more changes and test depending on type of change.
  - Test small changes with AB testing.
  - Test complex changes with AB testing via redirects or with usability testing of a prototype

If sufficiently addressed launch. Move to the next lowest performer

### Prototyping
Create a one or more prototypes based on the needs.
Verify the prototype against baseline usability standards.
- System status visibility: The system should provide appropriate feedback.
- Match between system and real world: Use language familiar to the user and follow conventions.
- User control and freedom: Provide emergency exits, undo and redo.
- Consistency and standards. Things that appear the same should behave the same.
- Error prevention: Don’t just let users escape from errors; help users avoid them.
- Recognition rather than recall: Options should be visible. Instructions should be easy to find. Don’t make the user have to remember information.
- Flexibility and efficiency of use: Support shortcuts for expert users.
- Aesthetic and minimalist design: Avoid providing irrelevant information.
- Help users recognize and recover from errors: Error messages should be helpful.
- Help and documentation: Ideally, the system should be usable without documentation, but help should still be available and task-oriented.

Optionally, test the prototype(s) with a usability test or survey.
Test the prototype(s) for branding using a semantic survey.
Create a priority list of issues based on business impact, user impact and effort. Notably you do not have an actual volume measurement in this phase.

### Aesthetics
for a group of style tokens, components or tiles
  Test with a semantic survey
  Test with a preference test against competitors or with multiple options

### Information Architecture
#This process is straightforward / linear.
Start your architecture from scratch.
Get top tasks through top task analysis.
Use top tasks for open card sorting to get top-level groups and navigation for those groups.
Use established top-level navigation in closed card sorting to verify top-level navigation and to establish sub-sections.
Test your architecture with tree testing.
Rearrange your architecture by moving things where people expect them to be.
If some items have low agreement then cross-link those items.
