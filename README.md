# Js-work-exemple-001   Task: “Interactive movie list with Drag&Drop”

Context:
We have a client who needs a personal account to manage their movie watchlist. The layout has already been designed, but it needs to be “brought to life” using JavaScript. We need to implement the logic of the list and interactive drag and drop. The designer has already provided the layout, your task is to write clean, maintainable JS.

The task at hand!!!!.
 Adding a movie
   · When you enter the field and press the button (or Enter), the movie is added to the “To watch” list.
   · The field is cleared after adding.
2. Element management
   · Each movie has two buttons: “mark as watched” (eye) and “delete” (cross).
   · When you click on the eye, the movie is moved to the “Watched” list and changes style (strikethrough).
   · When you click on the cross, the movie is deleted from any list.
3. Drag&Drop
   · Implement dragging and dropping movies between lists.
   · During dragging, the item should be visually highlighted (opacity, transform).
   · When dropped into another list, the movie should move there and change its status.
4. Statistics
   · Counters are updated in real time in the top bar and in the list headers.
   · Total movies / To watch / Watched.
5. Data storage
   · The state of the lists is stored in localStorage so that everything is restored when the page is reloaded.
6.  Details
   · Keep in mind that lists may be empty — display appropriate messages.
   · Handle attempts to add an empty movie.
   · The code should be modular, without global variables in window.
   · Use modern JavaScript (ES6+).
