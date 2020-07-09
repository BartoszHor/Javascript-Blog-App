/*document.getElementById("test-button").addEventListener("click", function() {
	const links = document.querySelectorAll(".titles a");
	console.log("links :", links)
})
*/
const titleClickHandler = function(event){
	console.log('Link was clicked!');
	console.log(event);
	event.preventDefault();
	const clickedElement = this;

	/* remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll(".titles a.active")

	for(let activeLink of activeLinks) {
	  activeLink.classList.remove("active");
	}

	/* add class 'active' to the clicked link */
	console.log("Clicked element: ", clickedElement)
	this.classList.add("active")

	/* remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll(".posts .post.active")

	for(let activeArticle of activeArticles) {
		activeArticle.classList.remove("active")
	}
	/* get 'href' attribute from the clicked link */

	const articleSelector = this.getAttribute("href");
	console.log(articleSelector);

	/* find the correct article using the selector (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);
	console.log(targetArticle);
	/* add class 'active' to the correct article */
	targetArticle.classList.add("active")
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}