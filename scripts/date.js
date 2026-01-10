//code for finding current year
//import html tag to display date
const currentYear = document.getElementById("currentyear")
//import date method 
const year= new Date();
//display in DOM
currentYear.innerHTML = year.getFullYear();


//code for last modified
const lastModified = document.querySelector('#lastModified')
lastModified.innerHTML = `Last Modification ${document.lastModified}`

//creating an event listerner for menu on small screens
menuButton = document.getElementById("menu");
navButton = document.getElementById("navMenu");

//create Event listener by click
menuButton.addEventListener('click',()=>{ 
    menuButton.classList.toggle('show');
    navButton.classList.toggle('show');
});

const y=10;



//js code for dynamic display of courses
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


///code to display the courses

//function for displvying courses
// Function for displaying courses
function displayCourse(course) {
     // Calculate total credit once
     const total = course.reduce((sum, c) => sum + (c.credits || 0), 0);
     const totalDisplay = document.getElementById("totalCredits");
     totalDisplay.textContent = `Total credit for courses listed above is : ${total}`;
 
    // Get the container
    const container = document.getElementById("courseContain");

    // Loop through each course and build UI
    course.forEach(c => {
        const subject = c.subject;
        const number = c.number;
        const credit = c.credits;
        const com = c.completed;
        
        // Create a new div
        const courseCard = document.createElement("div");
        courseCard.classList.add("design");

        // Add inner HTML
        courseCard.innerHTML = `
             ${subject} ${number} ${com ? '<img src="images/check-lg.svg" alt="completed" class="tick-icon">' : ""}
        `;

        container.appendChild(courseCard);
    });
}

function filteredCourse(type){
     let filtered = [];

    if( type === "all"){
        filtered = courses;
    } 
    else if( type === "wdd"){
        filtered = courses.filter(c => c.subject ==="WDD")
    } 
    else if (type ==="cse"){
        filtered = courses.filter(c => c.subject === "CSE")
    }

    //clear space for new filter
    const container = document.getElementById("courseContain");
    container.innerHTML = " ";
    
    //call for html function
    displayCourse(filtered);

}


//an event listener to activte function
document.addEventListener("DOMContentLoaded", () => {
    displayCourse(courses);
});
