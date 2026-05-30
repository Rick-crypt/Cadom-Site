# 📋 Guide de Déploiement sur Vercel

## Configuration des Variables d'Environnement

### Étapes de configuration :

1. **Allez sur Vercel** : https://vercel.com/dashboard

2. **Sélectionnez votre projet** "Cadom-Site"

3. **Allez dans "Settings"** (Paramètres)

4. **Cliquez sur "Environment Variables"** dans le menu de gauche

5. **Ajoutez chaque variable** en cliquant sur "Add New"

### Variables à ajouter :

#### 🔥 Firebase (obligatoire)
```
VITE_FIREBASE_API_KEY = votre_clé_api_firebase
VITE_FIREBASE_AUTH_DOMAIN = votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = votre_project_id
VITE_FIREBASE_STORAGE_BUCKET = votre_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = votre_sender_id
VITE_FIREBASE_APP_ID = votre_app_id
```

📌 **Où les trouver** : https://console.firebase.google.com/
- Allez dans votre projet
- Cliquez sur "Paramètres du projet" ⚙️
- Onglet "Comptes de service"
- Copiez la configuration (clé privée)

#### 🤖 Google Gemini API (obligatoire)
```
GEMINI_API_KEY = votre_gemini_api_key
```

📌 **Où les trouver** : https://ai.google.dev/
- Cliquez sur "Get API Key"
- Créez une nouvelle clé API

#### 📧 Email JS (optionnel, pour les emails)
```
VITE_EMAILJS_SERVICE_ID = votre_service_id
VITE_EMAILJS_TEMPLATE_ID = votre_template_id
VITE_EMAILJS_PUBLIC_KEY = votre_public_key
```

📌 **Où les trouver** : https://www.emailjs.com/
- Connectez-vous à votre compte
- Dashboard → Email Services → Copiez SERVICE_ID
- Dashboard → Email Templates → Copiez TEMPLATE_ID
- Account → API Keys → Copiez PUBLIC_KEY

#### 🖥️ Configuration Serveur
```
NODE_ENV = production
PORT = 3000
```

### ✅ Étapes finales :

1. Après avoir ajouté TOUTES les variables, cliquez sur **"Save"**

2. **Redéployez votre application** :
   - Allez dans "Deployments"
   - Cliquez sur le dernier déploiement
   - Cliquez sur "Redeploy"
   
   Ou pushez un nouveau commit :
   ```bash
   git add .
   git commit -m "trigger: redeploy with env vars"
   git push
   ```

3. Attendez que le déploiement se termine ✅

### 🔍 Vérification

- Allez sur **Function Logs** dans Vercel pour voir s'il y a des erreurs
- Vérifiez que toutes les variables sont présentes

### ⚠️ Problèmes courants

**"Environment Variable references Secret which does not exist"**
- → Assurez-vous que TOUTES les variables VITE_* sont ajoutées
- → Vérifiez qu'aucune n'est vide

**"Firebase initialization failed"**
- → Vérifiez les clés Firebase dans la console Firebase
- → Assurez-vous que Firestore est activé

**"Gemini API error"**
- → Vérifiez votre clé API Gemini
- → Assurez-vous que votre plan à crédits disponibles

### 💡 Conseils

- Ne partagez **jamais** vos clés API publiquement
- Utilisez des clés séparées pour développement et production
- Testez localement d'abord avec `.env.local`

---

Pour plus d'aide : consultez la [documentation Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
