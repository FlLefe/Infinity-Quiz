INSERT INTO public."user"(
	email, password, nickname, role, prompt, profile_picture)
	VALUES 
    ('default@account.com', '$2b$10$jqql6EbT/C4MfClW.1C05.DJ99h1qjCInSov5CSjlonTSvPL/VjKu', 'defaultAccount', 'member', 5, 'profil_picture2.png'),
	('admin@admin.com', '$2b$10$jqql6EbT/C4MfClW.1C05.DJ99h1qjCInSov5CSjlonTSvPL/VjKu', 'adminAccount', 'admin', 1000, 'profil_picture3.png'),
    ('member@member.com', '$2b$10$jqql6EbT/C4MfClW.1C05.DJ99h1qjCInSov5CSjlonTSvPL/VjKu', 'memberAccount', 'member', 5, 'profil_picture5.png'),
    ('fakeoclock@gmail.com', '$2b$10$jqql6EbT/C4MfClW.1C05.DJ99h1qjCInSov5CSjlonTSvPL/VjKu', 'Gaufre', 'member', 5, 'profil_picture4.png');

INSERT INTO public.quiz(
	theme, difficulty, rate, author_id)
	VALUES 
	('Paris', 'Avancé', 15, 1),
	('css','Moyen', 15, 3),
	('Les recettes de cuisine', 'Facile', 21, 1),
	('Astronomie', 'Facile', 1, 3),
	('Node.js', 'Avancé', 1, 1);


INSERT INTO public.score(
score, user_id, quiz_id)
VALUES 
(8, 1, 1),
(6, 1, 2),
(9, 1, 5),
(4, 2, 3),
(7, 2, 4),
(9, 3, 4),
(0, 3, 2);

INSERT INTO public.question(
	label, good_answer, answer_1, answer_2, answer_3, quiz_id)
	VALUES 
	('Quel est le nom du célèbre musée situé à Paris ?', 'Le Louvre', 'Le Musée d''Orsay', 'Le Centre Pompidou', 'Le Musée Rodin', 1),
	('Quel monument emblématique de Paris a été construit pour l''Exposition universelle de 1889 ?', 'La Tour Eiffel', 'L''Arc de Triomphe', 'Le Sacré-Cœur', 'La Cathédrale Notre-Dame de Paris', 1),
    ('Quel est le nom du quartier bohème et artistique de Paris, connu pour ses cafés et ses moulins ?', 'Montmartre', 'Le Marais', 'Saint-Germain-des-Prés', 'Le Quartier Latin', 1),
    ('Quel est le nom du célèbre cabaret de Paris, connu pour ses spectacles de music-hall ?', 'Le Moulin Rouge', 'Le Lido', 'Crazy Horse', 'Paradis Latin', 1),
    ('Quel est le nom du fleuve qui traverse Paris ?', 'La Seine', 'La Loire', 'Le Rhône', 'La Garonne', 1),
    ('Quel est le nom de l''avenue emblématique de Paris, connue pour ses boutiques de luxe et ses grands magasins ?', 'Les Champs-Élysées', 'La Rue de Rivoli', 'La Rue du Faubourg Saint-Honoré', 'La Rue Saint-Honoré', 1),
    ('Quel est le nom du célèbre cimetière de Paris, où reposent de nombreuses personnalités ?', 'Le Père Lachaise', 'Le Cimetière Montparnasse', 'Le Cimetière du Montmartre', 'Le Cimetière de Passy', 1),
    ('Quel est le nom de la célèbre avenue arborée de Paris, connue pour ses théâtres et ses cafés ?', 'Les Grands Boulevards', 'L''Avenue des Champs-Élysées', 'L''Avenue Montaigne', 'L''Avenue de l''Opéra', 1),
    ('Quel est le nom de la célèbre université de Paris, fondée au Moyen Âge et connue pour sa prestigieuse bibliothèque ?', 'La Sorbonne', 'L''Université Paris-Dauphine', 'L''Université Panthéon-Assas', 'L''Université Paris 1 Panthéon-Sorbonne', 1),
    ('Quel est le nom du célèbre quartier des affaires de Paris, où se trouve la Défense ?', 'La Défense', 'Bercy', 'La Bourse', 'Le Quartier de l''Opéra', 1),
    ('Quelle est la signification de CSS ?', 'Cascading Style Sheets', 'Cascading Sheet Style', 'Cascading Style Scripts', 'Cascading Style Syntax', 2),
    ('Quel est l''élément HTML utilisé pour lier une feuille de style externe à un document HTML ?', 'link', 'style', 'css', 'href', 2),
    ('Quelle propriété CSS est utilisée pour définir la couleur de fond d''un élément ?', 'background-color', 'color-background', 'bg-color', 'color', 2),
    ('Quelle est la propriété CSS utilisée pour définir la taille de la police ?', 'font-size', 'text-size', 'size', 'font', 2),
    ('Quelle est la signification de l''acronyme HTML ?', 'HyperText Markup Language', 'HyperText Makeup Language', 'HyperText Marking Language', 'HyperText Markup Level', 2),
    ('Quel est l''élément HTML utilisé pour créer un lien hypertexte ?', 'a', 'link', 'href', 'hyperlink', 2),
    ('Quelle balise HTML est utilisée pour définir un titre pour le document ?', 'title', 'head', 'h1', 'meta', 2),
    ('Quelle est la signification de l''acronyme URL ?', 'Uniform Resource Locator', 'Universal Resource Link', 'Uniform Resource Link', 'Universal Resource Locator', 2),
    ('Quel langage est utilisé pour styliser la présentation d''une page web ?', 'CSS', 'HTML', 'JavaScript', 'PHP', 2),
    ('Quelle est la propriété CSS utilisée pour aligner le texte à droite ?', 'text-align', 'align', 'right-align', 'text-right', 2),
    ('Quel est l''ingrédient principal de la ratatouille ?', 'Aubergine', 'Tomate', 'Courgette', 'Poivron', 3),
    ('Quelle est la principale épice utilisée dans la cuisine italienne ?', 'Basilic', 'Origan', 'Romarin', 'Thym', 3),
    ('Quel est l''ingrédient principal de la tarte Tatin ?', 'Pomme', 'Poire', 'Framboise', 'Cerise', 3),
    ('Quel est l''ingrédient principal de la salade niçoise ?', 'Thon', 'Oeuf', 'Olives', 'Haricots verts', 3),
    ('Quel est l''ingrédient principal de la soupe à l''oignon ?', 'Oignon', 'Carotte', 'Pomme de terre', 'Poireau', 3),
    ('Quel est l''ingrédient principal de la paella ?', 'Riz', 'Poulet', 'Crevettes', 'Poivron', 3),
    ('Quelle est la principale viande utilisée dans le boeuf bourguignon ?', 'Boeuf', 'Porc', 'Agneau', 'Poulet', 3),
    ('Quel est l''ingrédient principal de la quiche lorraine ?', 'Lardons', 'Fromage', 'Oignon', 'Champignons', 3),
    ('Quelle est la principale herbe aromatique utilisée dans la cuisine française ?', 'Persil', 'Ciboulette', 'Estragon', 'Coriandre', 3),
    ('Quel est l''ingrédient principal de la crème brûlée ?', 'Crème', 'Oeuf', 'Sucre', 'Vanille', 3),
    ('Quelle est la plus grande planète du système solaire ?', 'Jupiter', 'Mars', 'Vénus', 'Saturne', 4),
    ('Quel est le nom de l''étoile autour de laquelle la Terre orbite ?', 'Le Soleil', 'Vénus', 'Mars', 'Jupiter', 4),
    ('Quel est le nom de la première personne à avoir marché sur la Lune ?', 'Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'John Glenn', 4),
    ('Quel est le nom de la galaxie dans laquelle se trouve notre système solaire ?', 'La Voie lactée', 'Andromède', 'Sombrero', 'Triangulum', 4),
    ('Quel est le nom de la première sonde spatiale à avoir atteint la surface de Mars ?', 'Viking 1', 'Curiosity', 'Opportunity', 'Spirit', 4),
    ('Quelle est la distance moyenne entre la Terre et le Soleil ?', '150 millions de kilomètres', '100 millions de kilomètres', '200 millions de kilomètres', '50 millions de kilomètres', 4),
    ('Quel est le nom de la première femme à avoir voyagé dans l''espace ?', 'Valentina Terechkova', 'Sally Ride', 'Mae Jemison', 'Yelena Serova', 4),
    ('Quel est le nom de la théorie scientifique expliquant l''expansion de l''univers ?', 'Le Big Bang', 'La théorie de la relativité', 'La théorie de l''évolution', 'La théorie de la gravitation', 4),
    ('Quel est le nom de la plus grande lune de Saturne ?', 'Titan', 'Europe', 'Ganymède', 'Callisto', 4),
    ('Quel est le nom de la première station spatiale permanente en orbite autour de la Terre ?', 'ISS (Station spatiale internationale)', 'Mir', 'Skylab', 'Salyut 1', 4),
    ('Quel est le moteur JavaScript utilisé par Node.js?', 'V8', 'SpiderMonkey', 'Chakra', 'Rhino', 5),
    ('Quelle méthode est utilisée pour charger un module dans Node.js?', 'require()', 'import()', 'include()', 'load()', 5),
    ('Quelle est la bibliothèque principale pour gérer les requêtes HTTP dans Node.js?', 'http', 'express', 'request', 'axios', 5),
    ('Quelle méthode est utilisée pour exécuter une fonction après un délai dans Node.js?', 'setTimeout()', 'setInterval()', 'setImmediate()', 'sleep()', 5),
    ('Quel module est utilisé pour manipuler les chemins de fichiers dans Node.js?', 'path', 'fs', 'url', 'util', 5),
    ('Quelle méthode est utilisée pour écrire dans un fichier en mode asynchrone dans Node.js?', 'fs.writeFile()', 'fs.write()', 'fs.appendFile()', 'fs.createWriteStream()', 5),
    ('Quelle est la version actuelle de Node.js?', '14.x', '12.x', '10.x', '8.x', 5),
    ('Quelle méthode est utilisée pour gérer les erreurs de manière asynchrone dans Node.js?', 'callback', 'Promise', 'async/await', 'EventEmitter', 5),
    ('Quel est le gestionnaire de paquets par défaut utilisé par Node.js?', 'npm', 'yarn', 'pnpm', 'bower', 5),
    ('Quelle méthode est utilisée pour exécuter du code avant la fin du processus dans Node.js?', 'process.on(''exit'')', 'process.exit()', 'process.abort()', 'process.end()', 5);