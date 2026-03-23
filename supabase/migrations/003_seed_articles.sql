-- ============================================
-- Cikel — Seed Bilingual Health Articles
-- ============================================

-- Article 1: Understanding Your Menstrual Cycle (menstrual_health)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'understanding-your-menstrual-cycle',
  'Razumevanje menstrualnega cikla',
  'Understanding Your Menstrual Cycle',

  'Menstrualni cikel je naraven biološki proces, ki spremlja vsako žensko v reproduktivnem obdobju. Povprečen cikel traja med 21 in 35 dni, najpogosteje pa okoli 28 dni. Razumevanje posameznih faz cikla vam lahko pomaga bolje razumeti svoje telo, prepoznati vzorce in poskrbeti za svoje zdravje.

Cikel se deli na štiri glavne faze. Prva je menstrualna faza, ki traja običajno od 3 do 7 dni. V tem času se maternična sluznica odlušči, kar povzroči krvavitev. Mnoge ženske v tej fazi občutijo krče, utrujenost in spremembe razpoloženja. Telo v tem času potrebuje počitek in nežno skrb.

Sledi folikularna faza, ki se začne hkrati z menstruacijo in traja do ovulacije. V tej fazi hipofiza izloča folikel stimulirajoči hormon (FSH), ki spodbudi rast foliklov v jajčnikih. Raven estrogena postopoma narašča, kar prinese več energije, boljše razpoloženje in večjo zbranost.

Ovulacija nastopi približno na sredini cikla, običajno med 12. in 16. dnem. Zrel jajček se sprosti iz jajčnika in potuje po jajcevodu. To je najplodnejši del cikla. Mnoge ženske v tem času opazijo povečano spolno željo, prozorno cervikalno sluz in rahlo zvišanje bazalne telesne temperature.

Zadnja je lutealna faza, ki traja od ovulacije do začetka naslednje menstruacije. Prazen folikel se spremeni v rumeno telesce, ki izloča progesteron. Če do oploditve ne pride, raven hormonov pade, kar lahko sproži predmenstrualne simptome, kot so napihnjenost, občutljivost prsi in nihanje razpoloženja.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Ob kakršnih koli skrbeh se posvetujte s svojo zdravnico ali ginekologinjo.*',

  'The menstrual cycle is a natural biological process that accompanies every woman during her reproductive years. The average cycle lasts between 21 and 35 days, most commonly around 28 days. Understanding the individual phases of your cycle can help you better understand your body, recognize patterns, and take care of your health.

The cycle is divided into four main phases. The first is the menstrual phase, which typically lasts 3 to 7 days. During this time, the uterine lining sheds, causing bleeding. Many women experience cramps, fatigue, and mood changes during this phase. Your body needs rest and gentle care during this time.

Next comes the follicular phase, which begins alongside menstruation and lasts until ovulation. During this phase, the pituitary gland releases follicle-stimulating hormone (FSH), which stimulates follicle growth in the ovaries. Estrogen levels gradually rise, bringing more energy, improved mood, and better focus.

Ovulation occurs around the middle of the cycle, typically between days 12 and 16. A mature egg is released from the ovary and travels through the fallopian tube. This is the most fertile part of the cycle. Many women notice increased libido, clear cervical mucus, and a slight rise in basal body temperature during this time.

The last phase is the luteal phase, lasting from ovulation until the start of the next period. The empty follicle transforms into the corpus luteum, which secretes progesterone. If fertilization does not occur, hormone levels drop, which can trigger premenstrual symptoms such as bloating, breast tenderness, and mood swings.

*This article is for informational purposes only and does not replace professional medical advice. If you have any concerns, please consult your doctor or gynecologist.*',

  'Spoznajte štiri faze menstrualnega cikla in kako vplivajo na vaše telo, energijo in razpoloženje.',
  'Learn about the four phases of the menstrual cycle and how they affect your body, energy, and mood.',
  'menstrual_health',
  true,
  ARRAY['menstrual', 'follicular', 'ovulation', 'luteal']
);

-- Article 2: Managing Period Pain Naturally (menstrual_health)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'managing-period-pain-naturally',
  'Naravno lajšanje menstrualnih bolečin',
  'Managing Period Pain Naturally',

  'Menstrualne bolečine, znane tudi kot dismenoreja, so ena najpogostejših težav, s katerimi se srečujejo ženske med menstruacijo. Krči nastanejo zaradi krčenja maternice, ki pomaga izločiti maternično sluznico. Čeprav so določene bolečine normalen del cikla, obstajajo številni naravni načini za njihovo lajšanje.

Toplota je eden najučinkovitejših naravnih pristopov. Topla blazina ali grelnična steklenica, položena na spodnji del trebuha, pomaga sprostiti mišice maternice in izboljša prekrvavitev. Raziskave so pokazale, da je toplota pri lajšanju menstrualnih krčev lahko enako učinkovita kot nekatera protibolečinska zdravila. Topla kopel z dodatkom magnezijeve soli prav tako prinaša olajšanje.

Gibanje se morda ne zdi privlačno, ko vas bolijo krči, vendar lahko nežna vadba bistveno pomaga. Hoja, raztezanje in joga povečajo pretok krvi in spodbudijo sproščanje endorfinov, ki so naravni protibolečinski hormoni. Posebej koristne so joga poze, kot sta otrokov položaj in položaj mačke-krave.

Prehrana igra pomembno vlogo pri obvladovanju bolečin. Živila, bogata z omega-3 maščobnimi kislinami (losos, orehi, lanena semena), imajo protivnetne lastnosti. Magnezij, ki ga najdemo v temni čokoladi, bananah in špinači, pomaga sprostiti mišice. Izogibajte se prekomernemu uživanju kofeina, soli in predelanih živil, saj lahko poslabšajo simptome.

Nekatera zelišča so tradicionalno znana po učinku na menstrualne bolečine. Čaj iz ingverja ima protivnetne lastnosti in lahko zmanjša intenzivnost krčev. Kamilični čaj deluje pomirjujoče in sproščujoče. Cimetov čaj lahko pomaga urediti menstrualni pretok. Vedno pa se pred uporabo zeliščnih pripravkov posvetujte s strokovnjakom.

Tehnike sproščanja, kot so globoko dihanje, meditacija in progresivna mišična relaksacija, prav tako pomagajo obvladovati bolečino. Stres namreč lahko poslabša menstrualne krče, zato je skrb za duševno ravnovesje v tem obdobju še posebej pomembna.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Če so vaše menstrualne bolečine zelo hude ali se s časom poslabšujejo, se posvetujte z zdravnico.*',

  'Menstrual pain, also known as dysmenorrhea, is one of the most common issues women face during their period. Cramps occur due to uterine contractions that help shed the uterine lining. While some pain is a normal part of the cycle, there are many natural ways to find relief.

Heat is one of the most effective natural approaches. A warm pad or hot water bottle placed on the lower abdomen helps relax the uterine muscles and improves blood flow. Research has shown that heat therapy can be as effective as some pain medications for relieving menstrual cramps. A warm bath with added magnesium salts also provides relief.

Exercise might not seem appealing when you''re in pain, but gentle movement can significantly help. Walking, stretching, and yoga increase blood flow and stimulate the release of endorphins, which are natural pain-relieving hormones. Yoga poses such as child''s pose and cat-cow are particularly beneficial.

Diet plays an important role in managing pain. Foods rich in omega-3 fatty acids (salmon, walnuts, flaxseeds) have anti-inflammatory properties. Magnesium, found in dark chocolate, bananas, and spinach, helps relax muscles. Avoid excessive caffeine, salt, and processed foods, as they can worsen symptoms.

Certain herbs are traditionally known for their effects on menstrual pain. Ginger tea has anti-inflammatory properties and can reduce the intensity of cramps. Chamomile tea has calming and relaxing effects. Cinnamon tea may help regulate menstrual flow. However, always consult a professional before using herbal remedies.

Relaxation techniques such as deep breathing, meditation, and progressive muscle relaxation also help manage pain. Stress can worsen menstrual cramps, so taking care of your mental well-being during this time is especially important.

*This article is for informational purposes only and does not replace professional medical advice. If your menstrual pain is very severe or worsening over time, please consult your doctor.*',

  'Odkrijte naravne načine za lajšanje menstrualnih krčev, od toplote in gibanja do prehrane in sproščanja.',
  'Discover natural ways to relieve menstrual cramps, from heat and movement to diet and relaxation techniques.',
  'menstrual_health',
  true,
  ARRAY['menstrual']
);

-- Article 3: Nutrition Throughout Your Cycle (nutrition)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'nutrition-throughout-your-cycle',
  'Prehrana skozi menstrualni cikel',
  'Nutrition Throughout Your Cycle',

  'Hormonske spremembe med menstrualnim ciklom vplivajo na vaše prehranske potrebe, apetit in prebavo. S prilagajanjem prehrane posameznim fazam cikla lahko podprete svoje telo, zmanjšate neprijetne simptome in se počutite bolje.

Med menstrualno fazo telo izgublja kri in z njo železo. Osredotočite se na živila, bogata z železom, kot so rdeče meso, leča, špinača in brokoli. Vitamin C (citrusi, paprika, jagode) pomaga pri absorpciji železa. Topla in hranljiva hrana, kot so juhe in enolončnice, je v tem času še posebej prijetna. Zadosten vnos vode je ključen, saj dehidracija lahko poslabša krče in utrujenost.

V folikularni fazi raven estrogena narašča in s tem tudi vaša energija. To je odličen čas za lažjo, sveže in raznovrstno hrano. Vključite veliko zelenjave, fermentirana živila (jogurt, kislo zelje) za zdravo črevesno mikrobioto ter kakovostne beljakovine za podporo rasti foliklov. Kompleksni ogljikovi hidrati, kot so polnozrnata žita, sladki krompir in oves, zagotavljajo dolgotrajno energijo.

Okoli ovulacije je telo v najboljši formi. Podprite ga z antioksidanti iz sadja in zelenjave, zdravimi maščobami iz avokada, oljčnega olja in oreščkov ter vlakninami, ki pomagajo pri izločanju odvečnega estrogena. Križnice (brokoli, cvetača, zelje) so še posebej koristne, saj vsebujejo snovi, ki pomagajo pri presnovi estrogena.

V lutealni fazi raven progesterona naraste, kar pogosto prinese povečan apetit in željo po sladkem. Namesto sladkarij posezite po kompleksnih ogljikovih hidratih in živilih, bogatih z magnezijem (temna čokolada, oreščki, semena), ki pomagajo pri predmenstrualnih simptomih. Živila z vitaminom B6 (piščanec, losos, čičerika) podpirajo tvorbo serotonina in pomagajo pri razpoloženju.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Za osebni prehranski načrt se posvetujte z nutricionistko ali dietetičarko.*',

  'Hormonal changes during the menstrual cycle affect your nutritional needs, appetite, and digestion. By adapting your diet to each phase of the cycle, you can support your body, reduce uncomfortable symptoms, and feel better overall.

During the menstrual phase, your body loses blood and with it iron. Focus on iron-rich foods such as red meat, lentils, spinach, and broccoli. Vitamin C (citrus fruits, bell peppers, strawberries) helps with iron absorption. Warm, nourishing foods like soups and stews are especially comforting during this time. Adequate water intake is crucial, as dehydration can worsen cramps and fatigue.

In the follicular phase, estrogen levels rise and with them your energy. This is a great time for lighter, fresh, and varied foods. Include plenty of vegetables, fermented foods (yogurt, sauerkraut) for healthy gut microbiome, and quality proteins to support follicle growth. Complex carbohydrates like whole grains, sweet potatoes, and oats provide sustained energy.

Around ovulation, your body is at its peak. Support it with antioxidants from fruits and vegetables, healthy fats from avocado, olive oil, and nuts, and fiber that helps eliminate excess estrogen. Cruciferous vegetables (broccoli, cauliflower, cabbage) are especially beneficial as they contain compounds that support estrogen metabolism.

During the luteal phase, progesterone levels rise, often bringing increased appetite and sugar cravings. Instead of sweets, reach for complex carbohydrates and magnesium-rich foods (dark chocolate, nuts, seeds) that help with premenstrual symptoms. Foods with vitamin B6 (chicken, salmon, chickpeas) support serotonin production and help with mood.

*This article is for informational purposes only and does not replace professional medical advice. For a personalized nutrition plan, consult a nutritionist or dietitian.*',

  'Prilagodite svojo prehrano fazam menstrualnega cikla za več energije in manj simptomov.',
  'Adapt your diet to each phase of the menstrual cycle for more energy and fewer symptoms.',
  'nutrition',
  true,
  ARRAY['menstrual', 'follicular', 'ovulation', 'luteal']
);

-- Article 4: Iron-Rich Foods for Menstruation (nutrition)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'iron-rich-foods-for-menstruation',
  'Živila, bogata z železom, za čas menstruacije',
  'Iron-Rich Foods for Menstruation',

  'Železo je esencialno mineralno hranilo, ki igra ključno vlogo pri tvorbi hemoglobina — beljakovine v rdečih krvničkah, ki prenaša kisik po telesu. Med menstruacijo ženske izgubijo kri in s tem tudi železo, zato je ustrezno nadomeščanje tega minerala v tem obdobju še posebej pomembno.

Povprečna ženska med menstruacijo izgubi od 30 do 80 ml krvi, pri močnejšem pretoku pa lahko tudi več. To lahko privede do znižanih zalog železa, kar se kaže kot utrujenost, bledica, slabša zbranost in občutek mraza. Če je pomanjkanje dolgotrajno, lahko vodi v slabokrvnost (anemijo), ki zahteva zdravniško obravnavo.

Obstajata dve obliki prehranskega železa: hemsko in nehemsko. Hemsko železo, ki ga najdemo v živalskih virih, se bolje absorbira. Najboljši viri so rdeče meso (govedina, jagnjetina), jetra, morski sadeži (školjke, kozice) in temno perutninsko meso. Nehemsko železo iz rastlinskih virov se absorbira slabše, a je vseeno zelo pomembno. Bogati viri so leča, čičerika, fižol, tofu, špinača, bučna semena in kvinoja.

Za boljšo absorpcijo železa ga kombinirajte z vitaminom C. Dodajte limonin sok k solati s špinačo, pojejte papriko ob obroku s fižolom ali zaključite obrok z jagodami ali kiviji. Nasprotno pa se izogibajte pitju kave ali čaja ob obrokih, bogatih z železom, saj tanini zavirajo absorpcijo.

Preprost dnevni jedilnik, bogat z železom, bi lahko izgledal takole: za zajtrk ovsena kaša z bučnimi semeni in jagodami, za kosilo solata z lečo, papriko in limoninim prelivom, za večerjo pa losos ali govedina s kvinojo in brokolijem. Za prigrizek posezite po peščici mandljev ali koščku temne čokolade.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Če sumite na pomanjkanje železa, se posvetujte z zdravnico, ki vam lahko predpiše krvne preiskave.*',

  'Iron is an essential mineral that plays a key role in producing hemoglobin — a protein in red blood cells that carries oxygen throughout the body. During menstruation, women lose blood and with it iron, making adequate replenishment of this mineral especially important during this time.

The average woman loses between 30 and 80 ml of blood during menstruation, and those with heavier flow may lose even more. This can lead to depleted iron stores, which manifests as fatigue, paleness, poor concentration, and feeling cold. If the deficiency persists, it can lead to iron-deficiency anemia, which requires medical attention.

There are two forms of dietary iron: heme and non-heme. Heme iron, found in animal sources, is better absorbed. The best sources include red meat (beef, lamb), liver, seafood (clams, shrimp), and dark poultry meat. Non-heme iron from plant sources is less well absorbed but still very important. Rich sources include lentils, chickpeas, beans, tofu, spinach, pumpkin seeds, and quinoa.

To improve iron absorption, combine it with vitamin C. Add lemon juice to a spinach salad, eat bell peppers alongside a bean dish, or finish your meal with berries or kiwi. Conversely, avoid drinking coffee or tea with iron-rich meals, as tannins inhibit absorption.

A simple iron-rich daily menu might look like this: oatmeal with pumpkin seeds and berries for breakfast, a lentil salad with bell peppers and lemon dressing for lunch, and salmon or beef with quinoa and broccoli for dinner. For a snack, reach for a handful of almonds or a piece of dark chocolate.

*This article is for informational purposes only and does not replace professional medical advice. If you suspect iron deficiency, consult your doctor, who can order blood tests.*',

  'Spoznajte najboljše vire železa in kako jih vključiti v prehrano med menstruacijo.',
  'Learn about the best sources of iron and how to include them in your diet during menstruation.',
  'nutrition',
  true,
  ARRAY['menstrual']
);

-- Article 5: Exercise and Your Cycle (exercise)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'exercise-and-your-cycle',
  'Vadba in vaš menstrualni cikel',
  'Exercise and Your Cycle',

  'Gibanje je izjemno koristno za vaše zdravje v vseh fazah menstrualnega cikla, vendar se vaša zmogljivost, energija in motivacija spreminjajo skupaj s hormoni. S prilagajanjem vadbe posameznim fazam cikla lahko dosežete boljše rezultate in se izognete pretreniranosti.

Med menstrualno fazo so ravni estrogena in progesterona nizke, kar pogosto prinese utrujenost in manjšo motivacijo. To ni čas za rekorde, temveč za nežno gibanje. Priporočljive so hoja, rahlo raztezanje, yin joga ali lahkotno plavanje. Takšna vadba izboljša prekrvavitev, zmanjša krče in dvigne razpoloženje, ne da bi dodatno obremenila telo.

Folikularna faza je čas naraščajoče energije. Estrogen narašča in z njim vaša moč ter vzdržljivost. To je idealen čas za intenzivnejšo vadbo: trening moči, visokointenzivni intervalni trening (HIIT), tek ali skupinske vadbe. Telo se v tej fazi hitreje regenerira, zato lahko varno povečate obremenitev.

Okoli ovulacije ste na vrhuncu svoje zmogljivosti. Energija, koordinacija in samozavest so na najvišji ravni. Izkoristite to za najzahtevnejše treninge — težke dvige, sprinte ali intenzivne ekipne športe. Bodite pa pozorni na sklepe, saj povišan estrogen lahko rahlo poveča gibljivost sklepov in s tem tveganje za poškodbe.

V lutealni fazi progesteron narašča, kar lahko prinese utrujenost, napihnjenost in slabše razpoloženje. Zmanjšajte intenzivnost in se posvetite zmernim aktivnostim: zmernemu kardiu, pilatesu, plavanju ali daljšim sprehodom. Poslušajte svoje telo — če se počutite dobro, vadite; če ne, si dovolite počitek. Vadba v tej fazi pomaga pri predmenstrualnih simptomih, a pretiravanje lahko poveča stres v telesu.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Posvetujte se s trenerko ali fizioterapevtko za vadbeni program, prilagojen vašim potrebam.*',

  'Movement is incredibly beneficial for your health in all phases of the menstrual cycle, but your performance, energy, and motivation change along with your hormones. By adapting your exercise to each phase, you can achieve better results and avoid overtraining.

During the menstrual phase, estrogen and progesterone levels are low, often bringing fatigue and reduced motivation. This is not the time for personal records but for gentle movement. Walking, light stretching, yin yoga, or easy swimming are recommended. Such exercise improves blood flow, reduces cramps, and lifts mood without placing additional strain on the body.

The follicular phase is a time of rising energy. Estrogen increases and with it your strength and endurance. This is the ideal time for more intense workouts: strength training, high-intensity interval training (HIIT), running, or group classes. Your body recovers faster during this phase, so you can safely increase the load.

Around ovulation, you''re at the peak of your performance. Energy, coordination, and confidence are at their highest. Take advantage of this for the most demanding workouts — heavy lifts, sprints, or intense team sports. However, be mindful of your joints, as elevated estrogen can slightly increase joint laxity and with it the risk of injury.

During the luteal phase, progesterone rises, which can bring fatigue, bloating, and lower mood. Reduce intensity and focus on moderate activities: moderate cardio, Pilates, swimming, or longer walks. Listen to your body — if you feel good, exercise; if not, allow yourself rest. Exercise during this phase helps with premenstrual symptoms, but overdoing it can increase stress on the body.

*This article is for informational purposes only and does not replace professional medical advice. Consult a trainer or physiotherapist for an exercise program tailored to your needs.*',

  'Prilagodite vadbeni režim fazam cikla za boljše rezultate in počutje.',
  'Adapt your workout routine to your cycle phases for better results and well-being.',
  'exercise',
  true,
  ARRAY['menstrual', 'follicular', 'ovulation', 'luteal']
);

-- Article 6: Mental Health and Hormonal Changes (mental_health)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'mental-health-and-hormonal-changes',
  'Duševno zdravje in hormonske spremembe',
  'Mental Health and Hormonal Changes',

  'Hormoni, ki uravnavajo menstrualni cikel, imajo močan vpliv tudi na vaše duševno zdravje in čustveno počutje. Razumevanje te povezave vam lahko pomaga bolje obvladovati nihanja razpoloženja in biti do sebe bolj razumevajoča v zahtevnejših dneh.

Estrogen in serotonin sta tesno povezana. Estrogen spodbuja tvorbo serotonina — nevrotransmiterja, ki uravnava razpoloženje, spanje in apetit. Ko raven estrogena narašča v folikularni fazi, se pogosto počutimo bolj optimistične, družabne in motivirane. Ko pa estrogen pade pred menstruacijo, lahko občutimo žalost, razdražljivost ali tesnobo.

Progesteron, ki prevladuje v lutealni fazi, ima pomirjujoč učinek in deluje kot naravni anksiolitik. Vendar pa lahko pri nekaterih ženskah spremembe ravni progesterona sprožijo tesnobnost, nespečnost ali potrtost. Predmenstrualni sindrom (PMS) prizadene do 75 % žensk in vključuje čustvene simptome, kot so nihanje razpoloženja, jokavost, razdražljivost in težave z zbranostjo.

Obstaja tudi resnejša oblika, znana kot predmenstrualna disforična motnja (PMDD), ki prizadene 3 do 8 % žensk. PMDD povzroča intenzivne čustvene simptome, ki bistveno vplivajo na vsakdanje življenje — hudo depresijo, panične napade ali občutek brezupa. Če prepoznate te simptome, je pomembno, da poiščete strokovno pomoč.

Za podporo duševnemu zdravju skozi cikel poskusite naslednje strategije: redno beležite svoje razpoloženje in simptome, da prepoznate vzorce; ohranjajte redno telesno aktivnost, ki dokazano izboljšuje razpoloženje; poskrbite za dovolj spanja, še posebej v lutealni fazi; zmanjšajte vnos kofeina in alkohola, ki lahko povečata tesnobo; in vadite tehnike sproščanja, kot sta zavestno dihanje ali meditacija.

Pogovor o tem, kako se počutite, je izjemno pomemben. Delite svoje izkušnje s prijateljicami, partnerjem ali terapevtko. Menstrualni cikel ni izgovor za čustva, temveč njihov biološki kontekst, ki si zasluži razumevanje.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Če čustveni simptomi resno vplivajo na vaše vsakdanje življenje, se posvetujte s psihologinjo ali psihiatrinjo.*',

  'The hormones that regulate the menstrual cycle also have a powerful impact on your mental health and emotional well-being. Understanding this connection can help you better manage mood fluctuations and be more compassionate with yourself on difficult days.

Estrogen and serotonin are closely linked. Estrogen promotes the production of serotonin — a neurotransmitter that regulates mood, sleep, and appetite. When estrogen levels rise during the follicular phase, we often feel more optimistic, sociable, and motivated. When estrogen drops before menstruation, we may experience sadness, irritability, or anxiety.

Progesterone, which dominates during the luteal phase, has a calming effect and acts as a natural anxiolytic. However, for some women, changes in progesterone levels can trigger anxiety, insomnia, or low mood. Premenstrual syndrome (PMS) affects up to 75% of women and includes emotional symptoms such as mood swings, tearfulness, irritability, and difficulty concentrating.

There is also a more severe form known as premenstrual dysphoric disorder (PMDD), which affects 3 to 8% of women. PMDD causes intense emotional symptoms that significantly impact daily life — severe depression, panic attacks, or feelings of hopelessness. If you recognize these symptoms, it is important to seek professional help.

To support your mental health throughout the cycle, try the following strategies: regularly log your mood and symptoms to identify patterns; maintain regular physical activity, which is proven to improve mood; ensure adequate sleep, especially during the luteal phase; reduce caffeine and alcohol intake, which can increase anxiety; and practice relaxation techniques such as mindful breathing or meditation.

Talking about how you feel is incredibly important. Share your experiences with friends, a partner, or a therapist. The menstrual cycle is not an excuse for emotions but rather their biological context, which deserves understanding.

*This article is for informational purposes only and does not replace professional medical advice. If emotional symptoms seriously affect your daily life, please consult a psychologist or psychiatrist.*',

  'Spoznajte povezavo med hormoni in razpoloženjem ter kako poskrbeti za duševno zdravje skozi cikel.',
  'Learn about the connection between hormones and mood, and how to care for your mental health throughout your cycle.',
  'mental_health',
  true,
  ARRAY['menstrual', 'follicular', 'ovulation', 'luteal']
);

-- Article 7: Understanding Your Fertile Window (fertility)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'understanding-your-fertile-window',
  'Razumevanje plodnega okna',
  'Understanding Your Fertile Window',

  'Plodno okno je obdobje v menstrualnem ciklu, ko je verjetnost zanositve največja. Razumevanje tega obdobja je koristno ne glede na to, ali si želite zanositi ali pa želite bolje razumeti delovanje svojega telesa.

Plodno okno običajno traja približno šest dni — pet dni pred ovulacijo in dan ovulacije same. To je zato, ker lahko semenčice v ženskem telesu preživijo do pet dni, jajček pa je po sprostitvi iz jajčnika sposoben oploditve le 12 do 24 ur. Zato je najplodnejši čas dan ali dva pred ovulacijo, ko so semenčice že prisotne v jajcevodu ob sprostitvi jajčka.

Ovulacija nastopi, ko zrel jajček zapusti jajčnik. Pri 28-dnevnem ciklu se to običajno zgodi okoli 14. dne, vendar je čas ovulacije lahko zelo različen od ženske do ženske in tudi od cikla do cikla. Ženske s krajšimi cikli lahko ovulirajo že 10. dan, tiste z daljšimi pa šele 20. dan ali kasneje.

Obstaja več načinov za prepoznavanje plodnega okna. Spremljanje cervikalne sluzi je eden najzanesljivejših: ko postane prozorna, raztegljiva in podobna beljaku, se ovulacija približuje. Merjenje bazalne telesne temperature lahko potrdi, da je ovulacija že nastopila — temperatura se po ovulaciji rahlo dvigne. Ovulacijski testi, ki zaznavajo porast luteiniziranega hormona (LH) v urinu, lahko napovedo ovulacijo 24 do 36 ur vnaprej.

Aplikacije za sledenje ciklu, kot je Cikel, vam pomagajo zbirati in analizirati te podatke ter napovedati vaše plodno okno. Vendar ne pozabite, da so napovedi ocene in ne zagotovila. Vsak cikel je lahko nekoliko drugačen, na ovulacijo pa vplivajo tudi stres, bolezen, potovanje in spremembe življenjskega sloga.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Za načrtovanje nosečnosti ali kontracepcijo se posvetujte s svojo ginekologinjo.*',

  'The fertile window is the period in the menstrual cycle when the probability of conception is highest. Understanding this window is useful whether you''re trying to conceive or simply want to better understand how your body works.

The fertile window typically lasts about six days — five days before ovulation and the day of ovulation itself. This is because sperm can survive in the female body for up to five days, while an egg is only viable for fertilization for 12 to 24 hours after release from the ovary. Therefore, the most fertile time is the day or two before ovulation, when sperm are already present in the fallopian tube when the egg is released.

Ovulation occurs when a mature egg leaves the ovary. In a 28-day cycle, this typically happens around day 14, but the timing of ovulation can vary greatly from woman to woman and from cycle to cycle. Women with shorter cycles may ovulate as early as day 10, while those with longer cycles may not ovulate until day 20 or later.

There are several ways to identify your fertile window. Tracking cervical mucus is one of the most reliable: when it becomes clear, stretchy, and resembles egg white, ovulation is approaching. Measuring basal body temperature can confirm that ovulation has already occurred — temperature rises slightly after ovulation. Ovulation predictor kits, which detect a surge in luteinizing hormone (LH) in urine, can predict ovulation 24 to 36 hours in advance.

Cycle tracking apps like Cikel help you collect and analyze this data and predict your fertile window. However, remember that predictions are estimates, not guarantees. Each cycle can be slightly different, and ovulation is also affected by stress, illness, travel, and lifestyle changes.

*This article is for informational purposes only and does not replace professional medical advice. For family planning or contraception, consult your gynecologist.*',

  'Spoznajte, kdaj ste najbolj plodni in kako prepoznati znake ovulacije.',
  'Learn when you are most fertile and how to recognize the signs of ovulation.',
  'fertility',
  true,
  ARRAY['follicular', 'ovulation']
);

-- Article 8: Sleep and Your Menstrual Cycle (general)
insert into public.articles (slug, title_sl, title_en, body_sl, body_en, excerpt_sl, excerpt_en, category, is_published, relevant_phases)
values (
  'sleep-and-your-menstrual-cycle',
  'Spanje in menstrualni cikel',
  'Sleep and Your Menstrual Cycle',

  'Kakovost spanja se pogosto spreminja skozi menstrualni cikel, kar je povsem normalno, a hkrati frustrirajoče. Hormoni, ki uravnavajo vaš cikel, vplivajo tudi na vaš cirkadiani ritem, telesno temperaturo in sposobnost za mirno spanje.

V folikularni fazi, ko estrogen narašča, mnoge ženske poročajo o boljšem spanju. Estrogen spodbuja tvorbo serotonina, ki se ponoči pretvori v melatonin — hormon spanja. To je obdobje, ko se pogosto zbudite spočite in polne energije. Izkoristite to fazo za vzpostavitev dobrih spalnih navad, ki vam bodo pomagale tudi v zahtevnejših fazah cikla.

Okoli ovulacije se telesna temperatura rahlo dvigne, kar lahko pri nekaterih ženskah vpliva na kakovost spanja. Poskrbite za hladno spalnico (18–20 °C), lahka oblačila za spanje in zračno posteljnino. Če opazite, da se v tem času težje umirite, lahko pomaga večerna meditacija ali raztezanje.

Lutealna faza je za kakovost spanja pogosto najzahtevnejša. Progesteron, ki sicer deluje pomirjujoče, povzroči nadaljnje zvišanje telesne temperature. Poleg tega mnoge ženske pred menstruacijo občutijo tesnobo, napihnjenost ali bolečine, ki motijo spanje. Predmenstrualna nespečnost je pogosta in prizadene do 30 % žensk.

Med menstruacijo se bolečine, krči in neudobje lahko neposredno odražajo na kakovosti spanja. Topla blazina na trebuhu, udoben spalni položaj (na boku s skrčenimi nogami) in pomirjujoč zeliščni čaj pred spanjem lahko pomagajo.

Splošni nasveti za boljši spanec skozi ves cikel vključujejo: ohranjajte reden urnik spanja tudi ob vikendih; omejite uporabo zaslonov vsaj eno uro pred spanjem; izogibajte se kofeinu po 14. uri, še posebej v lutealni fazi; poskrbite za redno telesno aktivnost, a ne prepozno zvečer; in ustvarite sproščujoč večerni ritual, ki telesu sporoča, da je čas za počitek.

*Ta članek je zgolj informativne narave in ne nadomešča strokovnega medicinskega nasveta. Če imate dolgotrajne težave s spanjem, se posvetujte z zdravnico.*',

  'Sleep quality often fluctuates throughout the menstrual cycle, which is completely normal but also frustrating. The hormones that regulate your cycle also affect your circadian rhythm, body temperature, and ability to sleep soundly.

During the follicular phase, when estrogen is rising, many women report better sleep. Estrogen promotes serotonin production, which converts to melatonin — the sleep hormone — at night. This is a period when you often wake up feeling rested and full of energy. Use this phase to establish good sleep habits that will help you through the more challenging phases of the cycle.

Around ovulation, body temperature rises slightly, which can affect sleep quality for some women. Keep your bedroom cool (64–68°F / 18–20°C), wear light sleepwear, and use breathable bedding. If you find it harder to wind down during this time, evening meditation or stretching can help.

The luteal phase is often the most challenging for sleep quality. Progesterone, while calming, causes a further rise in body temperature. Additionally, many women experience anxiety, bloating, or pain before their period that disrupts sleep. Premenstrual insomnia is common and affects up to 30% of women.

During menstruation, pain, cramps, and discomfort can directly impact sleep quality. A warm pad on your abdomen, a comfortable sleeping position (on your side with knees drawn up), and a calming herbal tea before bed can help.

General tips for better sleep throughout the cycle include: maintain a consistent sleep schedule even on weekends; limit screen use at least one hour before bed; avoid caffeine after 2 PM, especially during the luteal phase; ensure regular physical activity, but not too late in the evening; and create a relaxing bedtime routine that signals to your body that it''s time to rest.

*This article is for informational purposes only and does not replace professional medical advice. If you have persistent sleep problems, please consult your doctor.*',

  'Odkrijte, kako hormoni vplivajo na vaš spanec in kaj lahko storite za boljši počitek v vsaki fazi cikla.',
  'Discover how hormones affect your sleep and what you can do for better rest in each phase of your cycle.',
  'general',
  true,
  ARRAY['menstrual', 'follicular', 'ovulation', 'luteal']
);
