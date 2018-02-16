$(document).ready(function () {
  $('#search-form').on('submit', function (e) {
    e.preventDefault()
    const title = $('#title').val()
    const author = $('#author').val()
    const isbn = $('#isbn').val()

    if (!title && !author && !isbn)
      Materialize.toast('Please provide either a title, author, or ISBN number', 5000)
    else
      search(title, author, isbn)
  })

  $('select').material_select()
})

function search(title, author, isbn) {
  $('#search-form').hide()
  $('#spinner').css('display', 'flex')

  var url = 'https://www.googleapis.com/books/v1/volumes?orderBy=relevance&printType=books&q='

  if (title)
    url += 'intitle:' + title
  if (author)
    url += 'inauthor:' + author
  if (isbn)
    url += 'isbn:' + isbn

  $.getJSON(url, function (data) {
    console.log(data)

    var books = ''

    if (data.items) {
      data.items.forEach(function (item) {
        books += '<li class="book">'

        if (item.volumeInfo.imageLinks)
          books += '<img src="'+ item.volumeInfo.imageLinks.thumbnail +'" />'

        books +=
          '<div class="book-info">' +
          '<header class="page-header book-title">'+ item.volumeInfo.title +'</header>'

        if (item.volumeInfo.subtitle)
          books += '<div class="book-subtitle">'+ item.volumeInfo.subtitle +'</div>'

        if (item.volumeInfo.authors)
          books += '<div class="author">'+ item.volumeInfo.authors.join(', ') +'</div>'

        books += '<div class="action-btns">'

        if (item.volumeInfo.description)
          books +=
            '<a class="waves-effect waves-light btn grey modal-trigger" href="#'+ item.id +'">' +
            '  Description' +
            '</a>'

        books +=
          '    <button class="waves-effect waves-light btn secondary">' +
          '      Add' +
          '    </button>' +
          '  </div>' +
          '</div> '

        if (item.volumeInfo.description)
          books +=
            '<div id="'+ item.id +'" class="modal">' +
            '  <div class="modal-content">' +
            '    <h4>Description</h4>' +
            '    <p>'+ item.volumeInfo.description +'</p>' +
            '  </div> ' +
            '</div>'
        
        books += '</li>'
      })
    } else {
      books += '<li>No books were found that match your search criteria</li>'
    }

    $('#books').html(books)
    $('#spinner').hide()
    $('#results').show()
    $('.modal').modal()

    $('#new-search').click(function (e) {
      $('#title').val('')
      $('#author').val('')
      $('#isbn').val('')
      $('#results').hide()
      $('#search-form').show()
      $('#title').focus()
      Materialize.updateTextFields()
    })
  })
}