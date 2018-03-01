<template>
  <div>
    <header id="about-header" class="page-header">
      Welcome to Bookmark!
    </header>
    <section>
      A place to keep track of all your books, and to get fun,<br />completely unnecessary statistics about them
    </section>
    <section>
      Set yearly reading goals, keep track of your progress,<br />and view a history of everything you have read
    </section>

    <hr />

    <header id="faq-header" class="page-header">
      FAQ*
    </header>
    <section id="asterisk-text" class="faq-item">
      *Most functionality is not yet implemented. Development is currently in the mockup stage.
    </section>
    <section class="faq-item">
      <div class="question">
        What pages currently have content?
      </div>
      <div class="answer">
        The <b>Home</b> page, the <b>About</b> page, clicking the <b>Add Book</b> button, and clicking on
        <b>Words of Radiance</b> on the <b>Home</b> page.
      </div>
    </section>
    <section class="faq-item">
      <div class="question">
        What information is the home page showing me?
      </div>
      <div class="answer">
        The home page gives you a summary of the books you are currently reading, or have already read, for the
        current year. Click on one of the books to get more information about that book. The home page also gives you
        some quick information on how much progress you've made toward your reading goal for the year, as well as a few
        fun stats.
      </div>
    </section>
    <section class="faq-item">
      <div class="question">
        Where can I view all of my books?
      </div>
      <div class="answer">
        You can find your books by clicking on the <b>Books</b> tab at the top of the page. There you will find all of the
        books you have read, are currently reading, or that you want to read. You can also filter what books you want
        displayed by year, reading status, genre, etc.
      </div>
    </section>
    <section class="faq-item">
      <div class="question">
        What do the different icons on the books mean?
      </div>
      <div class="answer">
        <div class="icons">
          <span class="icon-info">
            <status-icon status="currentlyReading"></status-icon>
            Currently Reading
          </span>
          <span class="icon-info">
            <status-icon status="read"></status-icon>
            Read
          </span>
          <span class="icon-info">
            <status-icon status="wantToRead"></status-icon>
            Want to Read
          </span>
        </div>
      </div>
    </section>
    <section class="faq-item">
      <div class="question">
        How do I update the information for one of my books?
      </div>
      <div class="answer">
        Click on the books image. This will take you to a page with information just about that book, as well as the
        ability to add/remove/change that information.
      </div>
    </section>
  </div>
</template>

<script>
  import StatusIcon from './StatusIcon'

  export default {
    name: 'About',
    components: {
      StatusIcon
    }
  }
</script>

<style scoped>
  hr {
    margin: 64px 0;
    width: 400px;
  }

  header#about-header {
    font-size: 56px;
    font-weight: 600;
  }

  header#faq-header {
    margin-bottom: 0;
  }

  section {
    font-size: 20px;
    margin-bottom: 24px;
  }

  section#asterisk-text {
    font-size: 12px;
  }

  section.faq-item {
    margin-bottom: 48px;
  }

  section .question {
    font-weight: 500;
    margin-bottom: 16px;
  }

  section .answer {
    max-width: 600px;
  }

  section .answer .icons .icon-info {
    display: flex;
    margin-right: 64px;
  }

  section .answer .icons .icon-info:last-child {
    margin-right: 0;
  }

  section .answer .icons .icon-info i {
    margin-right: 8px;
  }

  @media only screen and (min-width: 600px) {
    header#about-header {
      font-size: 72px;
    }
  }
</style>
