# Test des demandes de devis

Branche réservée aux essais ; ne pas fusionner telle quelle dans master.

1. Ouvrir le déploiement Preview Vercel de cette branche (ou servir le dépôt avec un serveur local HTTP).
2. Vérifier la bannière TEST DEVIS. Utiliser le bouton Demander un devis et remplir des informations fictives.
3. Envoyer le formulaire formDevis. Il est envoyé uniquement à bdallahbwk@gmail.com ; aucun WhatsApp n’est ouvert pour cet essai. Les formulaires de contact et de visite ne sont pas concernés : ne pas les utiliser pour ce test.
4. Si FormSubmit envoie un e-mail d’activation, l’approuver dans Gmail, puis refaire le test. Vérifier également les spams.
5. Comparer la référence RM-TEST, les champs et l’URL de page dans l’e-mail reçu. Une réponse positive du service ne prouve pas à elle seule la livraison Gmail.
6. Vérifier également une coupure réseau dans les outils navigateur : une erreur doit être affichée, les champs doivent rester remplis et le bouton doit redevenir disponible.

Le script commun js/quote-test.js intercepte uniquement formDevis. Une demande de visite continue d’utiliser son traitement existant. La réception réelle doit être confirmée par le titulaire de la boîte Gmail.

Après validation, préparer une modification séparée de production avec l’adresse de l’entreprise et retirer la bannière de test.
