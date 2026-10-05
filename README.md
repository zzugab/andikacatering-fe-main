# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

## Cara Install & Menjalankan

### Lokal

```bash
npm install
npm run dev        # http://localhost:5173
# atau build + preview produksi
npm run build
npm run preview     # http://localhost:4173
```

### Docker

```bash
docker build -t andika-fe .
docker run -p 4173:4173 andika-fe   # http://localhost:4173
```

File `.env` berisi `BASE_URL` (alamat API). Untuk Docker, arahkan ke host API yang bisa diakses dari dalam container (bukan `localhost` kalau API berjalan di luar container).
