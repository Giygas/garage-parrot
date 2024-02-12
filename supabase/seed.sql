INSERT INTO temoignages(name, rating, message, approved)
  VALUES ('Francisco', 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro rerum ipsum sequi error saepe doloribus natus omnis iusto. Omnis, voluptatibus nihil et ut laboriosam tenetur!.', TRUE),
('Gustavo', 5, 'Quos, laboresit voluptates unde tempore molestiae dolore soluta quaerat est iure libero alias rerum. Quia architecto voluptates cupiditate aut autem sint tempora ad labore.', TRUE),
('Frank', 2, 'Super le service, mais un peu cher', TRUE),
('Stephane', 1, 'Mon vehicule n''est jamais sorti du garage', FALSE);

INSERT INTO services(title, description)
  VALUES ('Réparation de carrosserie', 'Nous sommes spécialisés dans la réparation de carrosserie pour redonner à votre voiture son aspect d''origine. Que ce soit pour des rayures, des bosses ou des dommages plus importants, notre équipe expérimentée utilise des techniques avancées et des équipements de pointe pour réparer votre carrosserie avec précision et efficacité. '),
('Réparation mécanique', 'Nos techniciens hautement qualifiés sont experts en réparation mécanique. Nous sommes en mesure de diagnostiquer et de résoudre efficacement les problèmes mécaniques de votre voiture, qu''il s''agisse du moteur, de la transmission, des freins, de la suspension ou de tout autre composant. Faites-nous confiance pour remettre votre véhicule en parfait état de fonctionnement.'),
('Entretien régulier', 'L''entretien régulier de votre voiture est essentiel pour garantir sa performance et sa durabilité. Nous proposons une gamme complète de services d''entretien, notamment la vidange d''huile, le remplacement des filtres, la vérification des fluides, la mise au point du moteur et bien plus encore. Faites confiance à notre équipe pour prendre soin de votre véhicule et le maintenir en excellent état.'),
('Service client exceptionnel', 'Chez le Garage V. Parrot, nous nous engageons à offrir un service client exceptionnel. Nous accordons une grande importance à votre satisfaction et à votre confiance. Notre équipe amicale et professionnelle est là pour répondre à toutes vos questions, vous fournir des conseils avisés et vous assurer une expérience agréable à chaque visite. \r\nN ''hésitez pas à nous contacter pour en savoir plus sur nos services ou pour prendre rendez - vous. Nous sommes impatients de vous offrir des services de qualité et de vous aider à prendre soin de votre voiture de manière fiable et professionnelle.');

INSERT INTO horaires(day, hours)
  VALUES ('lundi', '08:45 - 12:30, 14:30 - 18:00'),
('mardi', '08:45 - 12:30, 14:30 - 18:00'),
('mercredi', '08:45 - 12:30, 14:30 - 18:00'),
('jeudi', '08:45 - 12:30, 14:30 - 18:00'),
('vendredi', '08:45 - 12:30, 14:30 - 18:00'),
('samedi', '08:45 - 12:30'),
('dimanche', 'Fermé')
