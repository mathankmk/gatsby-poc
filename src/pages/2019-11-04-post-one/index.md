---
path: "/post-one"
date: "2019-11-04"
title: "How We Used Gatsby.js to Build a Blazing Fast E-Commerce Site"
author: "Mae Capozzi"
link: "https://medium.com/harrys-engineering/how-we-used-gatsby-js-to-build-a-blazing-fast-e-commerce-site-a9818145c67b"
shortnote: "Flamingo has landed! Harry’s, Flamingo’s parent company, serves over one million female customers."
---

<p>Flamingo has landed! Harry’s, Flamingo’s parent company, serves over one million female customers. We believe that women deserve high-quality, reasonably priced, and simple body care products too.</p>
<p>As an engineering team, we are committed to providing women with a body care experience tailored to their specific needs. It’s important to us that our customers enjoy their interactions with us not only while they’re in the shower, but also when they shop for their blades, wax kits, or razor handles online too.</p>
<p>To simplify shopping for razors we built a performant, visually-appealing, and secure site. Our architecture performs well across browsers and devices, emphasizes developer ergonomics and modern tools, and lets us continuously deploy with confidence. We think shopflamingo.com can be a model for how to architect other e-commerce sites.</p>
<p>As excited as we are about what we’ve built, we try to stay realistic. We figured that we might be the only ones this engaged. To our surprise, we found out that other people actually did want to know how we built our site!</p>
<p>So here we go! These are the tools we used to build shopflamingo.com, why it works as well as it does, and how you can build similar applications to provide your users with performant, accessible experiences.</p>
<h4>Static Sites vs. Web Servers</h4>
<p>The early internet consisted of static sites. Each page a visitor saw was represented by a different HTML page. Every user that visited a site saw the same content as everyone else.
A little later, web servers arrived that could produce HTML dynamically. The typical flow looked like this: a user makes a request that may or may not be shielded by a CDN. That request hits the web server which interacts with a database or APIs. Based on the data that the database or API returns, the web server builds HTML pages and serves them to the browser.
Historically, static sites came with less security risks and prevented the application from spending time per request generating each page, making them more performant.</p>
<p>On the flip side, static sites made it difficult to share code between files. Additionally, a developer usually needed to update content on a static site since it was written into the HTML. For both of these reasons, large static sites could become difficult and time-consuming to maintain compared to a web server.</p>
<p>Unlike static sites, web servers could make real-time decisions about what content to show or hide to a user, providing more sophisticated personalization with less effort. But, building a web page dynamically every time a user visits a page takes a lot of time.
In recent years static site generators like Gatsby.js, Next.js, and Nuxt.js have made it much easier to walk a middle-ground between the static websites of the early web and dynamic web servers. It’s now possible to reap the performance and security benefits of a static site, while also having the ability to share code easily and fetch content from a CMS.</p>
<h3>How Did We Do It?</h3>
<h4>Gatsby</h4>
<p>Gatsby.js allows us to outsource a lot of the configuration that goes along with building a front-end in JavaScript in 2018. It handles setting up Webpack, React.js, HTML, and CSS for us so we can just focus on building new features, while providing the option to customize.
Because Gatsby is a static site generator, we get to write code in React.js instead of writing HTML, CSS, and JS. Gatsby docs describe this process well; during the build process, Gatsby performs an “optimized production build” that generates “static HTML and per-route JavaScript code bundles.”
A Gatsby plugin called gatsby-source-contentful makes it straightforward to pull content and assets from Contentful into Gatsby. We query for that content using GraphQL.
We deploy and host our static files in S3, and serve a cached version of those files from Fastly, further reducing latency and thereby improving user experience.</p>
<h4>Contentful</h4>
<p>We store all of our content in Contentful so that we don’t need to manage a database, server, or a custom CMS. We also have a webhook that triggers a build from our CMS to start a deployment.</p>
<h4>Circle CI</h4>
<p>We use Circle CI for continuous integration and to kick off our deployment flow. Circle CI runs Jest and Flow, runs the build and checks that it’s passing, deploys our code to a staging branch, and runs our Cypress tests. If we’re on the master branch, it rebuilds the site with our Production environment variables, and deploys to Amazon S3.</p>
<h4>Amazon S3</h4>
<p>We host the static files built by Gatsby in Amazon S3.</p>
<h4>Fastly</h4>
<p>Fastly is a content delivery network (CDN) that we use to cache the content that is in our S3 bucket so we can serve it to our users even more quickly. We configure Fastly to decide what content we want to cache and for how long, and use both gzip and Brotli to serve pre-compressed files.</p>
<h3>Our Hosting Architecture</h3>
<p>Let’s dive a bit deeper into how we’ve configured Fastly and S3 to deliver our content as quickly as possible to our users.</p>

<p>Imagine that we have a user in New York. That user makes a request to shopflamingo.com. Once the DNS record is returned, we make a request to Fastly. Because there’s a Fastly node in New York, the request will (in most cases) go there.</p>
<p>We ask the Fastly node if it has cached the most current version of the site. If the Fastly node has the current version cached, it will return it to the user. That process eliminates the need for the request chain to continue and reduces latency. If the Fastly node does not have a current version of the site cached, it will make a request and ask the Fastly shield node whether it has the current version cached.</p>
<p>If the Fastly shield node has the current version cached, it will return that to the user, updating the node in the user’s region on the way. If it doesn’t have a cached version, it has to ask the S3 bucket.</p>
<p>After a new deploy, the first user in a region experiences the most latency. Their request will go all of the way to the S3 bucket, since none of the Fastly nodes have a cached current version of the site. Once that initial request goes through, all of the other users in that area can access the site from the closest Fastly node, reducing latency for them. Also, the first user will access a cached version of the site from then on, until we deploy new version of the site.</p>
<p>We work hard to deliver existing content to our users as quickly as possible, but what about new content? The second major component to our architecture allows us to deploy quickly and easily multiple times a day.</p>

<h3>Deployment Flow</h3>
<p>We have automated every part of our deployment flow to prevent time-consuming manual steps and to provide steps that make us confident that we’re not deploying broken code to our users.

The process starts when someone triggers a build. To trigger a build, someone either pushes their code to Github or publishes a change to our CMS.</p>
<h4>Circle CI Steps</h4>
<p>Once we trigger a build, Circle CI runs through a number of steps:</p>
<ol class=""><li >It runs Jest and checks to see if the Jest tests pass</li><li >It runs Flow and makes sure all of our type-checking passes</li><li >It runs the build and confirms the build passes</li><li >It pushes changes to a branch</li><li >It runs the Cypress tests</li><li >(Optional Step) If we’re on master and all of the tests pass, Circle CI will rebuild the site with the production ENV variables.</li></ol>
<p>If any of these steps fails, Circle CI will fail the build and the process will stop.
Once the build is green (on staging or master), Circle CI pushes the static files generated by Gatsby to S3, and the process described in the Hosting Architecture section begins.</p>
<h3>The Whole System</h3>
<p>Now that we’ve talked through the the two major components of the system, here’s a diagram of everything working together.</p>
<ol class=""><li >A developer or product manager pushes to Github or publishes to our CMS</li><li >Circle CI triggers a build</li><li >Gatsby builds the site</li><li >Gatsby fetches data from our CMS.</li><li>Gatsby passes data to GraphQL</li><li >GraphQL passes data back to Gatsby</li><li>Gatsby builds the static pages</li><li >Circle CI pushes the static pages to S3</li><li >Fastly fetches and serves the static site</li><li >A user accesses shopflamingo.com</li></ol>
<p>
We sought to build a highly-performant e-commerce site, and believe we achieved just that. We love working on this application, and hope that you will consider using it as a model when you build your next e-commerce site.</p>
