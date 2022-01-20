function NileDB() {
    let test =
    <body>
      <header>
        {/* <%- include("../partials/header") %> */}
        <div class="container">
          <h1>Browse publications by decade</h1>
          <p>
            <span class="readable text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
              </svg>
              = Publication can be read on this site
            </span>
          </p>
        </div>
      </header>
      <main class="container">
        <nav id="index" class="d-flex flex-wrap justify-content-center"></nav>
        <div id="decades">
          <p id="loadingmsg" class="h2">Loading publication list...</p>
          <template id="decade">
            <h2 class="decade-name">Loading</h2>
            <table class="publications container">
              <thead>
                <tr>
                  <th>Title</th>
                  <th class="text-right">Years&nbsp;traveled</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </template>
          <template id="publication">
            <tr>
              <td>
                <a class="title" href="blank">Loading</a>
                <span class="readable text-secondary d-none" title="The publication can be read on this site"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg></span>
                <ul class="author small-authorlist"></ul>
              </td>
              <td class="travel-dates text-right font-weight-bold"></td>
            </tr>
          </template>
        </div>
      </main>
      {/* <%- include("../partials/footer") %> */}
      <script type="module" src="./check-status.mjs"></script>
      <script type="module" src="./decades-list.mjs"></script>
    </body>
    return(test);
}

export default NileDB;