---
sidebar_position: 1
---
# Development Loop
This document outlines the development process. Check-ins and problem solving should happen frequently between each phase.
:::note
This document does **not** address the project approval or prioritization process.
:::

# 1. Design
## Small Design
Deliverables
- Problem / Opportunity / Testing statement
    - In particular feedback from stakeholders should be translated into well described problem.
- Change description / CSS / Figma File / PSD
- Paul will be notified of any development that is not purely technical. It will go in eval column for review or in-progress column for items that are urgent or small, but will still noted as skipping the eval column.

If giving feedback through css provide only the properties that have changed. Selectors and important modifiers will be disregarded. This will help with knowing what the changes actually are without digging comparing and contrasting what the code is.

If providing CSS or a Change description include the situation in which the new changes apply. This will help with miscommunication about selectors.

If providing design files include the smallest view of the changes along with the large view. This will help with viewing margin and padding changes.

## Large Design
Deliverables
- Figma Files / PSD
- Purpose statement
    - Problem / Opportunity
    - Solution hypothesis 
- Real content in the design with the following definitions
    - Definitions for max and min content
    - Definitions for required vs optional content
    - Statement about what the minimum testing products should be
- Design interaction states as **components** (hover, active, focus, disabled, checked, ...)

## Design and Content Considerations
For any design consider the following Norman Heuristics. Not all of these are appropriate for all designs or in the design stage.

- **System status visibility**: The system should provide appropriate feedback.
- **Match between system and real world**: Use language familiar to the user and follow conventions.
- **User control and freedom**: Provide emergency exits, undo and redo.
- **Consistency and standards**: Things that appear the same should behave the same.
- **Error prevention**: Don’t just let users escape from errors; help users avoid them.
- **Recognition rather than recall**: Options should be visible. Instructions should be easy to find. Don’t make the user have to remember information.
- **Flexibility and efficiency of use**: Support shortcuts for expert users.
- **Aesthetic and minimalist design**: Avoid providing irrelevant information.
- **Help users recognize and recover from errors**: Error messages should be helpful.
- **Help and documentation**: Ideally, the system should be usable without documentation, but help should still be available and **task-oriented.**

# 2. Design handover meeting for large designs
This is a chance to address any concerns and to get clarifications.
In addition to reviewing the Norman Heuristics the following should be considered.
- Decide which designs will be go on to the implementation
The Developer will provide feedback on.
- Pieces of the design that might take a long time.
- Serious Data concerns. For the most part data should not be a concern.

# 3. HTML/CSS Implementation (optional for small designs)
This phase is to get a high fidelity design to the web team as soon as possible. It should be complete as far as html and css go, but should be integrated with WP/Data Sources as little as possible. Content from the design briefs should be statically placed in the locations. **Not recommended for external developers due to delays in response time**

# 4. Big eval loop
- Feedback should go to step 3
- Accessibility testing before external stakeholders
- This is when non-Marcomm stakeholders can be brought in for feedback
- Decide when development is ready to be split into design feedback and wordpress integration
- Paul certifies the agreed upon implementation. 

# 5. Wordpress / DB integration
- Integrate prototype into WP
- Biggest opportunity for outsourcing and or using a student worker.
- Steve approves the data integration and code organization

# 6. Staging test.
Test integration with system at large and that data integration did not cause differences with HTML/CSS implementation
- Large projects approved by Paul, Mo, Tom and Steve
- Small changes inform Paul before launch

# 7 Launch!
Run automated tests.
- On small and large projects alike Tom, Paul and Mo will be notified of the changes in each deployment.
- Feedback provided into the intake column, or email/phone if urgent.

Notes from stuff.