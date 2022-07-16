# Cool As Organics

## Links
Miro: https://miro.com/welcomeonboard/OHloMW9ZekZOaFVvS1hzdW1iT0RNOEFnRWlyS2hocWluSnlmTlo1MlNFY3pEQXBJZTQ1N3NsNm1KbndCUFFKVHwzNDU4NzY0NTI5MzUzMzU4NjA1?share_link_id=108513521950  
Figma: https://www.figma.com/file/1iu4uOUFE84ojz6Yx0MTW0/Cool-As-Organics?node-id=0%3A1

## User stories
On the home page I would like to see:  
* a list of fridge items that are expiring soonest
* links to recipes that use the expiring ingredients
* a button to add new items with manual or photo input

On the recipes page I would like to see:  
* multiple recipe options for the selected ingredient
* tags that indicate DF, GF, vegan, etc options
* a link that takes me to the recipe website

On the product input page I would like to see:  
* a form where I can input the product details (name, dates, category, etc)
* when I submit the form I would like to have some kind of confirmation that the product has been added
* after a successful submission the form is cleared ready for the next input

On the inventory page I would like to see:  
* a complete list of everything in the fridge/freezer

## API contract

| Method | Endpoint | Description | Return value|
|---|---|---|---|
| GET | /api/v1/products | Gets a list of all products | Array of product objects |
| POST | /api/v1/products | Adds a new product | Array with new product id |
| GET | /api/v1/recipes | Gets an array of recipes for a given ingredient | Array of recipe objects |

## Progress log

### Wednesday 13 July 2022
We completed most of the planning and during the discussion considered a pivot towards a more B2B product that operated on a larger scale and without the consumer-oriented features like recipe suggestion. However, after talking through the concept decided that it was going to be too big in scope and decided to stick with original concept.
### Thursday 14 July 2022
#### Retrospective
What went well:  
* planning and kanban
* setting boundaries on free time
* switching up the pair programming
* pacing
* wireframes
* good break ratio

What could be improved:  
Nothing so far.

Actions:  
* swap pairs after lunch (ticket permitting)
* keep taking breaks
* stay away from Crew...

### Friday 15 July 2022
#### Retrospective
What went well:  
* learning and asking for help e.g. tailwind, moment, formik
* code reviews
* making good progress on MVP
* good coding flow
* solo coding
* consolidating old concepts e.g. server-side API requests
* getting outside for lunch

What could be improved:  
* better commit messages

Actions:  
* use a standard approach to commit messages i.e. present tense verb, and make them as informative (but concise) as possible
