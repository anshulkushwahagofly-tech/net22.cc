const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const popupHtml = `
<div id="custom-welcome-popup" class="absolute inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-300" style="display: none;">
  <div class="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-sm w-[90%] text-center shadow-2xl transform scale-100 transition-transform">
    <div class="w-16 h-16 mx-auto bg-gradient-to-tr from-[#ff6b00] to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#ff6b00]/30">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <h3 class="text-2xl font-bold text-white mb-2">Welcome, Anshul! 🎉</h3>
    <p class="text-white/70 mb-8 text-sm leading-relaxed">Enjoy your favorite movies and shows! Please close this popup to start streaming the video.</p>
    <button onclick="document.getElementById('custom-welcome-popup').style.display='none'" class="w-full py-3.5 px-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]">Close & Play Movie</button>
  </div>
</div>
`;

// Insert it right before the iframe
html = html.replace(/<iframe id="watch-modal-iframe"/, popupHtml + '\n<iframe id="watch-modal-iframe"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Injected custom popup into HTML');
