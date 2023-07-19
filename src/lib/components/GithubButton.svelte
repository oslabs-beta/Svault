<script></script>

<button>
  <div>
    <img src="src/lib/assets/github-mark-white.png" alt="" />
    <a class="github" href="/oauth/github/auth"> Sign in with GitHub </a>
  </div>
</button>

<style>
  button {
    width: 190px;
    height: 2.5em;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
    background-color: black;
    /* padding: 12px 16px 12px; */
    &:hover {
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: rgb(246, 241, 241);
    font-size: 14px;
    font-weight: 500;
    padding-right: 5px;
  }
  img {
    width: 1.5em;
    padding-right: 8px;
    padding-left: 5px;
  }
</style>