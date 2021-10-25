# Frontend
I have decided to go with the design methodology that i like the most, called Atomic design, described below. It does create a lot of boiler plate code, but the end results extensibility and ease of use, is worth it. Because of this most of the app lives in `client/src/components`, the entrypoint of which is `client/src/components/pages/App.js`, this file handles all the logic, while the other folders in `client/src/components` contain the building blocks of the UI.

## Atomic design
I have decided to follow the Atomic design principle to create a clean and extensible design frontend, using reusable components.

Atomic design splits the componenents into:
- Atoms: Small reusable components, such as paragraphs, textfields, form inputs etc.
- Molecules: Larger reusable components, consisting of atoms
- Organims: Complex components that create an interface, built from molecules and atoms. This could fx. be an entire form
- Templates: Templates are collections of all of the above, used create abstract pages and layouts.
- Pages: Pages are templates with data, aka what the user actually interact with.

# Backend
## ES6
I have converted the project to use ES6, so that it follows the same convetions as the frontend, this makes it easier to switch between the two projects, as it creates consistency.

Unfortunately it does cause the project to compile for longer.

## Repository
I have abstracted the db handling away from the rest of application logic, by using the repository pattern. This wasn't so much for the needs of abstraction, but because the endpoint logic would be bloated, and to keep some level of consistency the repository pattern seemed obvious.

## Controller
To keep the `server.js` file somewhat clean, i have once again moved the code away and into the `controller.js` file. Therefore the `server.js` only contain repository, controller and http server instantiation, as well as route definitions.

## N nearest products algorithm
Described in detail in `server/src/db/inMemoryRepository.js` in a documentation comment.