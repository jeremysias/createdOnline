import React from 'react';
const strings = {
    en:{
        q0:{
            q:"Choose a pathway?",
            a1: "Non-Credit ESL",
            a2: "Credit ESL",
        },
        credit_level:{
            q:"What is your English level?",
            des:"Choose a level and read a story for that level. If you understand all or almost all the vocabulary, and can read the story without much difficulty, select that level. If the story is too difficult, read a story from the level below it. If the story is too easy, read a story from the level above it. We want you to choose a level that is just right for you.",
            a1: "Low Intermediate",
            a2: "Intermediate",
            a3: "High Intermediate",
            a4: "Advanced"
            
            
        },
        reading_level:{
            q: "Read the following sample, and decide if this is the appropriate level for you.",
            sample_940:(<div><p><strong>Level 1</strong></p><p>Today is March 17th. About two and a half months ago, I said "Happy New Year!" to many of my friends. Slightly more than a month ago, I said the same thing to some other friends. In about four days, I'll give the same wishes to yet another group of friends. I'll do the same thing in July and also in September.</p>
            <p>"How can that be?" you might be thinking.</p>
            <p>The answer to this question depends on the calendar you use. Five common world calendars celebrate New year at five different times: The Western/international calendar celebrates on January 1st. The Chinese calendar, used in China, Korea, and a few other places, rings in the New Year sometime in late January or February. The traditional Persian calendar, used in Iran, puts the New Year on March 21st. The Islamic calendar New Year falls on a different day of the Western calendar each year, because the calendar is based on the moon. The Eastern Orthodox Church calendar and the Jewish calendar are also based on the moon, but their New Years are usually in September.</p>
            <p>Whenever you celebrate the New Year, I hope you have a happy one!</p>
            <p>Adapted from:<br/>            
            Oliver, Dennis. “Happy New Years!” Dave's ESL Cafe, 0AD, www.eslcafe.com/quiz/read1a.html.</p></div>),
            sample_950:(<div><p><strong>Level 2</strong></p>
                <p>One of the most popular kinds of car in the United States is not really a car at all. It is a combination of a car and a truck. It is called a sports utility vehicle, or SUV. The market for SUVs continues to grow. About 22% of all cars and trucks sold in America are SUVs. One reason may be that the SUV seems like a vehicle that can do many different things. Brock Yates of Car and Driver Magazine says that parents like SUVs because they have a lot of space to transport children and food. Many Americans like the feeling they get from driving an SUV. The vehicles are larger than other cars on the road. This gives many drivers a feeling of safety.</p>
                <p>Yet, the size of SUVs is a concern. SUVs use more fuel than passenger cars. SUVs also produce more pollution than passenger cars do. SUVs create large amounts of carbon dioxide, a gas that causes climate change. One study found that an SUV will release about two times as much carbon dioxide as a car over the life of the vehicle.</p>
                
                <p>Critics say SUVs also produce more substances like carbon monoxide and nitrogen oxides. These gases form polluted air, or smog. There is also evidence that SUVs are not as safe as many people believe. The National Highway Traffic Safety Administration compared SUVs and normal cars in deadly accidents. Its study found that car passengers died in 80% of deadly accidents between cars and SUVs. Other studies showed that SUVs can turn over more easily than cars. The vehicles do not have the same safety requirements as passenger cars.  </p>
                <p>“Environmental Report: Sport Utility Vehicle .” <i>Voice of America</i>, VOA - Voice of America English News, 3 Oct. 2002, learningenglish.voanews.com/a/a-23-a-2002-10-03-2-1-83113752/120775.html. </p>
                </div>),
            sample_960:(<div>
                <p><strong>Level 3</strong></p>
                <p>Every year, Sweden publishes everyone's income tax returns. So do Finland and Norway. And nobody really cares. By contrast, U.S. law prohibits releasing anybody's tax information. Imagine the howl if the IRS put tax returns online, so co-workers, neighbors and mothers-in-law could see what someone earns. That happened in Italy earlier this year, when the outgoing government of prime minister Romano Prodi briefly posted taxpayers' incomes on the Internet, and newspapers picked up the list.</p>
                <p>Two weeks ago, Sweden published the tax returns of ordinary wage-earners. In November or December, Swedes can see how much high-rollers made — with their income from dividends and other investments — plus how much they paid in taxes for 2007. Sweden's policy of making tax returns public — as in Finland and Norway — stems from a tradition of open records and transparency in government, except in cases of national security and some aspects of criminal investigations. "The right of public access to documents is laid down in the constitution," Graner says of Sweden's practice since the 18th century.</p>
                <p>Making the data public demonstrates the Scandinavian belief that nobody is better than anyone else, says Veera Heinonen, spokeswoman for the Finish Embassy in London. "Finland is a very egalitarian country, and it's a very high-tax society, so it provides checks and balances," Heinonen says. She says people's earnings can be a good source of gossip. Is anybody embarrassed? "Well, maybe some chief executives," she says.</p>
                <p>Stinson, Jeffrey. “How Much Do You Make? It'd Be No Secret in Scandinavia.” <i>ABC News</i>, ABC News Network, 22 June 2008, abcnews.go.com/amp/Business/story?id=5199974&page=1. </p>
            </div>),
            sample_970:(<div>
                <p><strong>Level 4</strong></p>
                <p>Almost a century ago, the United States decided to make high school nearly universal. Around the same time, much of Europe decided that universal high school was a waste. Not everybody, European intellectuals argued, should go to high school. It’s clear who made the right decision. The educated American masses helped create the American century, as the economists Claudia Goldin and Lawrence Katz have written. The new ranks of high school graduates made factories more efficient and new industries possible. Today, we are having an updated version of the same debate. Television, newspapers and blogs are filled with the case against college for the masses: It saddles students with debt; it does not guarantee a good job; it isn’t necessary for many jobs. Not everybody, the skeptics say, should go to college.</p>
                <p>The argument has the lure of counter intuition and does have grains of truth. Too many teenagers aren’t ready to do college-level work. Ultimately, though, the case against mass education is no better than it was a century ago. The evidence is overwhelming that college is a better investment for most graduates than in the past. A new study even shows that a bachelor’s degree pays off for jobs that don’t require one: secretaries, plumbers and cashiers. And, beyond money, education seems to make people happier and healthier. “Sending more young Americans to college is not a panacea,” says David Autor, an M.I.T. economist who studies the labor market. “Not sending them to college would be a disaster.”</p>
                <p>The most unfortunate part of the case against college is that it encourages children, parents and schools to aim low. For those families on the fence — often deciding whether a student will be the first to attend — the skepticism becomes one more reason to stop at high school. Only about 33 percent of young adults get a four-year degree today, while another 10 percent receive a two-year degree.</p>
                <p>Source:<br/>Leonhardt, David. “Even for Cashiers, College Pays Off.” <i>The New York Times</i>, The New York Times, 25 June 2011, www.nytimes.com/2011/06/26/sunday-review/26leonhardt.html. </p>
            </div>),
            sample_980:"This is the 980 Reading Sample",
            a1: "Too Hard",
            a2: "Just Right",
            a3: "Too Easy"

        },
        listen_speak_level:{
            q:"What is your Listening and Speaking level?",
            des:"You chose Reading level ",
            a1: "Low Intermediate",
            a2: "Intermediate",
            a3: "High Intermediate",
            a4: "Advanced"
            
        },
        write_essay:{
            q: "Read the question and write an answer. You have 30 minutes.",
            prompt1: "This is writing Write about a particularly good or bad day in your life. Do you wish that anything had been different?",
            prompt2: "This is writing prompt 2",
            prompt3: "This is writing prompt 3",
            prompt4: "This is writing prompt 4"
        },
        other_student_writing_samples:{
            q: "Is your writing at the same level?",
            sample_940: "I had four good days in my life. First good day was my wedding day. Second good day was when I got my first baby boy. Third was when I got my second baby boy. And fourth was when I got a baby girl. Now I am happy with them. Even though my life is very busy as a mom, they make me happy every day. I wish every day my kids will be happy and healthy.",
            sample_950: (<div><p className="text-center">Bad Day in My Life</p>Saturday, August 17, 2017 was a bad day for me for several reasons. First, the reason was I left my country for another country. I left my family there. I was crying all the time. When I arrived in Egypt, I couldn’t speak with the people there. Also, I didn’t find my suitcase in the airport. I didn’t have any family there. It was hard to find a good and safe hotel. Now I tell my friends, "Don’t go anywhere by yourself because it will be hard and it is not safe."</div>),
            sample_960: (<div><p className="text-center">My Wedding Day</p><p>One of my memorable days in my life is definitely the day I got to experience a virtual reality game in Las Vegas with my brother and cousins. Not too long ago, my family took a trip to Las Vegas to visit my uncle and his family who I had never met before. Therefore, when I first met them, it was not going well and everybody, especially my cousins, were very quiet. We were not even talking to each other that whole day. Everything changed when they suggested going to play a cooperating game with us.</p><p> The day we went for that game was very special. We had reached out and made an appointment for that particular game in the morning and had to arrive at the game station 20 minutes before the game started. However, the person who drove us there somehow misunderstood and misheard 10 minutes before the game started. So eventually we were late for the game and had to wait for three more hours for it. In the waiting time, we went to have some coffee and talked to each other more to break the ice. And we were closer than before.</p><p>
            After we played the virtual reality game, we had had so much fun with the game, and it felt like there was no distance between us anymore. We felt like an actual family. I still keep contact with my cousins until now and the day we got closer will be the day I never forget!</p></div>),
            sample_970: (<div><p>Yesterday, January 26, 2020, was a horrible day for all sports fans.  I was awakened by my husband who sadly told me the news: Kobe Bryant and his 13-year old daughter were killed in a helicopter crash on their way to his daughter’s basketball training session.</p><p>My generation basically grew up with Kobe.  He was not only a basketball idol, but also a great inspiration to people who love sports all over the world.  Everyone was so shocked and angry to accept the truth of Kobe’s sudden death.  We know life is unfair, but why him?  Why his 13-year old daughter Gigi?</p><p>I read from the news that their helicopter was drawing circles above the sky of downtown L.A. for a while, but it eventually crashed in the woods.  I honestly cannot picture more of their last moments of their lives.  This makes my eyes blurry again and again, and I just cannot stop the tears.</p><p>If I could talk to God. I wish everything can be changed on that day.  I wish Kobe and Gigi could have driven a car instead of taking an old helicopter.  I wish Gigi would have woken up late and missed her basketball training session.  I wish they would have had a different pilot or a different helicopter.  I wish something important could have kept them home.</p><p>I hope there is basketball and a nice court in heaven for them.  Farewell #24.</p></div>),
            sample_980: (<div><p>It is not easy to decide what day is a particularly good day.  My life is nice and easy and I love it.  I can not say it started with having my family, but for sure my wedding day is something I will never forget.</p><p>We decided to have our ceremony on our property as by that time we lived in the mountains and owned a wonderful old house (it used to be a farm.)  And the scenery out there was amazing, spectacular.  Part of the reason we decided to have it there was that my future husband didn’t want people driving the cars from the town hall back to our house and the hassle with logistics.  The city officials agreed to come so we set the date and invited our friends and family to our home.</p><p>Many of our friends came and stayed for the weekend.  I will never forget my best friend from university and her boyfriend crying like crazy while cutting kilos of onions for the potato salad.  It was probably proof of their relationship as they got married two years after us.</p><p>Of course we had too much food; that’s a must at occasions like this. I can’t remember eating any of the salads, soups, or pastry, but I do remember the cake.  The delicious walnut cake my mother baked three days before the wedding to have it just right.</p><p>I can’t say I would change a thing.  It would be a different wedding then.  In my opinion, it has to be that mixture of sadness, excitement, nervousness, and other feelings to transform any kind of day into THE day.  The day a person can remember for the rest of her/his life.</p>
            </div>),
            a1: "Go Lower",
            a2: "Stay Same",
            a3: "Go Higher"
        }
    },
    sp:{
        q0:{
            q:"Habla Ingles?",
            a1: "No",
            a2: "Si"
        }
    }
}
export default strings;