# Therapy-Box Hackathon Project

A dashboard web application built with React and Firebase.
- To run it, simply run `npm run start` or visit https://personal-dashboard-414ef.web.app/ (30-day access)
- File structure:
    - `component-public`: Stores components available for all pages. Currently it is storing the `Hints` component that gets displayed after a CRUD operation is done.
    - `context`: Stores different React Context. A Dashboard cell shares the corresponding context with its internal page. It helps prevent props drilling. Every context has a useXXXContext hook to improve code reuse.
    - `firebase`: The firebase configuration file.
    - `hooks`: Custom hooks that encapsulate different logic like CRUD operations, sign up, get geo-position and fetching resources
    - `pages`: Stores pages (as React components) and sub-components


# Resources I read along the way
1. I customised HTML checkbox elements based on [this article](https://medium.com/claritydesignsystem/pure-css-accessible-checkboxes-and-radios-buttons-54063e759bb3).
2. I created the pie chart by reading [this document](https://github.com/d3/d3-shape#pies).
3. Firebase-related syntax is based on [this](https://firebase.google.com/docs/firestore/manage-data/add-data) and [this](https://firebase.google.com/docs/storage/web/upload-files?hl=zh-cn#web-version-8_7)
4. [This question](https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded) helped me set up the preview of user selected images.
5. [This useful trick](https://dev.to/fenok/stretching-body-to-full-viewport-height-the-missing-way-2ghd#:~:text=Applying%20min%2Dheight%3A%20100vh%20to,grow%20even%20more%20if%20necessary.) helped set up grid/flex containers that take up all remainig space.