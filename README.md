# New Plan

## Loyiha haqida
Bu loyiha mening shaxsiy rejalarimni tartibli ravishda yozib borish uchun yaratilgan. Bu yerga men o'zimning ish rejalari, kundalik vazifalar va kelajakdagi maqsadlarimni kiritaman.

## Maqsad
Maqsadim o'zim tuzgan rejalarni bir joyga jamlash, ularni ketma-ket yozib borish va bajariladigan ishlarni aniq ko'rinishda saqlash.

## Nimalar qilinadi
- Shaxsiy ish rejalar yoziladi
- Kundalik vazifalar kiritiladi
- Muhim maqsadlar belgilanadi
- Rejalar ketma-ket tartibda saqlanadi
- Bajarilgan ishlar nazorat qilib boriladi

## Bosqichlar
1. Rejalarni yozib borish
2. Vazifalarni tartiblash
3. Muhim ishlarni ajratish
4. Bajarilgan ishlarni belgilash
5. Yangi rejalarni qo'shib borish

## Eslatma
Bu repository mening shaxsiy rejalashtirish joyim hisoblanadi.

## Ishga tushirish
1. `.env.example` dan nusxa olib `.env` yarating.
2. Admin sahifani himoyalash uchun `.env` ichiga `ADMIN_PASSWORD` yozing. Ixtiyoriy ravishda `ADMIN_USERNAME` ni o'zgartirishingiz mumkin; default login `admin`.
3. Xohlasangiz `ADMIN_PHONE` ga admin telefon raqamini yozing. Agar kiritilsa, tizimga kirishda login va parol bilan birga shu telefon raqami ham tekshiriladi.
4. Xohlasangiz `ADMIN_SESSION_TTL_HOURS` bilan admin sessiya qancha vaqt yashashini belgilang. Default qiymat `12`.
5. Kerak bo'lsa `PORT` va `HOST` qiymatlarini moslang.
6. Terminalda `node server.js` yoki `npm start` ishga tushiring.
7. Brauzerda `http://127.0.0.1:3000` ni oching.

`ADMIN_PASSWORD` to'ldirilgan bo'lsa, `index.html` ichida tizimga kirish oynasi chiqadi. To'g'ri login/parol kiritilgach sessiya cookie yaratiladi va admin panel ochiladi. `ADMIN_PHONE` ham berilgan bo'lsa, telefon raqami ham tekshiriladi.

# zamarxshar
