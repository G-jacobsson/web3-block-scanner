export function showModal() {
  const modal = document.querySelector('#displayModal');
  modal.innerHTML = `<div id="customModal" style="display:none; position:fixed; z-index:100; left:0; top:0; width:100%; height:100%; overflow:auto; background-color: rgba(0,0,0,0.4); padding-top:60px;">
    <div style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 450px;">
      <span id="closeModal" style="cursor: pointer; color: #aaa; float: right; font-size: 28px; font-weight: bold;">&times;</span>
      <p>Please install MetaMask to use this application.</p>
      <p><a class="text-pop" href="https://metamask.io/download.html" target="_blank">Download MetaMask</a></p>
    </div>`;
  document.querySelector('#customModal').style.display = 'block';

  document.querySelector('#closeModal').onclick = function () {
    document.querySelector('#customModal').style.display = 'none';
  };
}
