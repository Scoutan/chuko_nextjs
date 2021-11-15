<h1>Chuko</h1>

<h3>Note: deployment of project has been taken down as the fetch target's api has changed and so my code needs to be updated to avoid errors.</h3>

This is my first personal project using React. The conception of this project has been inspired by a website that I have discovered recently, <a href="https://buyfriend.moe">buyfriend.moe</a>. Currently, its central function is to fetch public information found on other websites and display it on one page, for ease of viewing. The scope of this project is limited to shopping for figures and hobbies, notably from japan, e.g. “<a href="https://amiami.com">amiami.com</a>”.

<h2>Sections</h2>

<h3>Item Watches</h3>
<p>This is where the user can fetch item information from supported websites to display and organize each one on the same page. It shares functional similarities to a shopping wish list, which is to facilitate the access to your items of interest. Currently, only two websites are supported i.e. <a href="https://1999.co.jp/eng">HobbySearch</a> and <a href="https://amiami.com/eng">amiami</a> and HTTP requests are used to fetch the HTML page of the requested item, via URL on the respective website. Then, I use the HTML parser tool, Cheerio.js, and regex to extract all relevant information, such as item ID, price, and stock. The information is stored into this class component’s state (note that I intentionally made this as the only class component of this project as a way to practice with it).</p>
<p>I plan to include additional features such as:</p>
<ol>
  <li>Selectively update information to avoid the potential long response time from many simultaneous HTTP requests (e.g. “update stock” button);</li>
  <li>Multiple layout options to view the gathered information (e.g. “Cards” view and “List” view;</li>
  <li>Different sorting options;</li>
  <li>To show or hide some information;</li>
  <li>To customize the placement of information on particular layout options;</li>
  <li>User login with saved preferences of the features;</li>
  <li>Notification (browser/email) options for when the stock of an item has changed;</li>
  <li>Expand the list of websites from which information is fetched;</li>
  <li>Show a history of previously fetched data;</li>
</ol>

<h3>Blog</h3>
This section will show blog posts with insightful information about any items. The posts will be sorted from the most recent to the oldest and link to the page with the full article. My goal is to create or implement an input interface which can be used to style the post, such as headings, font size, indentations, paragraph separation, and so on (i.e. similar to a CMS). It will be connected to an API server as its database.

<h3>FAQ</h3>
<p>If there are enough visitors once this project goes live, I expect to have some frequently asked questions. So, this section is where I list the questions along with my responses.</p>

<h3>Contact</h3>
</p>This section would simply have a contact form which will be linked to an email address.</p>

<h3>Sign In / Register</h3>
<p>Ultimately, I would like to have a user database for the purpose of letting users save their preferences on their layout options, custom placement of information, notification setting, and such. I have yet to look into the secure handling and storing of user credentials, so until then, this section will be for internal users only.</p>
