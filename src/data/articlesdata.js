// src/data/articlesData.js

// Import main images (card images)
import article1 from '../assets/images/articles/Articlecard/article1.png';
import article2 from '../assets/images/articles/Articlecard/article2.png';
import article3 from '../assets/images/articles/Articlecard/article3.png';
import article4 from '../assets/images/articles/Articlecard/article4.png';
import article5 from '../assets/images/articles/Articlecard/article5.png';
import article6 from '../assets/images/articles/Articlecard/article6.png';
import article7 from '../assets/images/articles/Articlecard/article7.png';
import article8 from '../assets/images/articles/Articlecard/article8.png';
import article9 from '../assets/images/articles/Articlecard/article9.png';
import article10 from '../assets/images/articles/Articlecard/article10.png';
import article11 from '../assets/images/articles/Articlecard/article11.png';
import article12 from '../assets/images/articles/Articlecard/article12.png';
import article13 from '../assets/images/articles/Articlecard/article13.png';
import article14 from '../assets/images/articles/Articlecard/article14.png';
import article15 from '../assets/images/articles/Articlecard/article15.png';
import article16 from '../assets/images/articles/Articlecard/article16.png';

// Import additional images (for content)
import articlei1 from '../assets/images/articles/ArticleImage/image1.png';
import articlei2 from '../assets/images/articles/ArticleImage/image2.png';
import articlei3 from '../assets/images/articles/ArticleImage/image3.jpg';
import articlei4 from '../assets/images/articles/ArticleImage/image4.png';
import articlei5 from '../assets/images/articles/ArticleImage/image5.png'; 
import articlei6 from '../assets/images/articles/ArticleImage/image6.png'; 
import articlei7 from '../assets/images/articles/ArticleImage/image7.png';
import articlei8 from '../assets/images/articles/ArticleImage/image8.png';
import articlei9 from '../assets/images/articles/ArticleImage/image9.png';
import articlei10 from '../assets/images/articles/ArticleImage/image10.png';
import articlei11 from '../assets/images/articles/ArticleImage/image11.png';
import articlei12 from '../assets/images/articles/ArticleImage/image12.png';
import articlei13 from '../assets/images/articles/ArticleImage/image13.jpg';
import articlei14 from '../assets/images/articles/ArticleImage/image14.png';
import articlei15 from '../assets/images/articles/ArticleImage/image15.png';
import articlei16 from '../assets/images/articles/ArticleImage/image16.jpg';

// Default image fallback
import defaultImage from '../assets/images/default.png'; // Provide a default image for missing cases

const articles = [
  {
    id: 1,
    title: "Article 1",
    tag: "parent",
    imgSrc: article1 || defaultImage, // Use default image if specific image is missing
    additionalImages: articlei1, // Using additional images
    abstract: "Abstract for article 1...",
    content: "Full content for article 1...",
  },
  {
    id: 2,
    title: "Article 2",
    tag: "spousal",
    imgSrc: article2 || defaultImage,
    additionalImages: articlei2,
    abstract: "Abstract for article 2...",
    content: "Full content for article 2...",
  },
  {
    id: 3,
    title: "Article 3",
    tag: "family",
    imgSrc: article3 || defaultImage,
    additionalImages: articlei3,
    abstract: "Abstract for article 3...",
    content: "Full content for article 3...",
  },
  {
    id: 4,
    title: "Article 4",
    tag: "spousal",
    imgSrc: article4 || defaultImage,
    additionalImages: articlei4,
    abstract: "Abstract for article 4...",
    content: "Full content for article 4...",
  },
  {
    id: 5,
    title: "Article 5",
    tag: "family",
    imgSrc: article5 || defaultImage,
    additionalImages: articlei5,
    abstract: "Abstract for article 5...",
    content: "Full content for article 5...",
  },
  {
    id: 6,
    title: "How to Turn Your Parent-Child Relationship into the Family’s Secret Sauce of Happiness",
    tag: "family",
    imgSrc: article6,
    additionalImages: articlei6 || defaultImage,
    abstract: "👨‍👩‍👧‍👦 Cracking the Code to a Happier Family 🏡 What if the secret to a happier family was right under your nose? 🤔 Turns out, it’s all in the way you connect with your kids! Dads as the unsung heroes of family joy, moms adding that special touch—there’s so much more to family dynamics than you might think. 😄 👉 Want to know how to supercharge your family’s happiness? Dive into the article and discover the little things that make a big difference!",
    content: `
    **Understanding the Importance of Connection**

    In today's fast-paced world, the importance of connecting with our children cannot be overstated. As parents, it’s easy to get caught up in the daily grind of work, chores, and other responsibilities. However, establishing a strong emotional connection with your children can be the key to their happiness and overall well-being. Studies have shown that children who feel connected to their parents are more likely to develop positive social skills, perform better academically, and have higher self-esteem. The foundation of a happy family lies in the small, everyday moments of connection, rather than grand gestures.

    **The Role of Communication**

    Communication is at the heart of any strong relationship, and the parent-child relationship is no different. It’s not just about talking; it’s about listening, understanding, and responding with empathy. Make it a habit to ask your children open-ended questions that encourage them to share their thoughts and feelings. Instead of asking, "Did you have a good day?" try asking, "What was the best part of your day?" This small shift can open up a world of dialogue and understanding. Active listening, where you show genuine interest and respond appropriately, can make your children feel valued and understood.

    **Creating Family Rituals**

    Family rituals are powerful tools for fostering a sense of belonging and security. These rituals don't have to be elaborate; they can be as simple as a weekly family movie night, a Sunday morning breakfast, or a nightly bedtime story. These consistent, predictable activities provide children with a sense of stability and comfort. They know what to expect and look forward to these moments of togetherness. Rituals also offer parents a break from the chaos of daily life and an opportunity to reconnect with their children. Over time, these shared experiences create lasting memories and strengthen family bonds.

    **Balancing Discipline with Love**

    Discipline is an essential part of parenting, but it must be balanced with love and understanding. Children need boundaries to feel secure, but they also need to know that they are loved unconditionally. When disciplining your children, focus on teaching rather than punishing. Explain the reasons behind the rules and involve your children in setting them. This approach not only teaches responsibility but also fosters respect and cooperation. Remember, the goal of discipline is not to control but to guide your children towards making better choices. Praise your children for their positive behavior and efforts, and offer constructive feedback when needed.

    **The Power of Positive Reinforcement**

    Positive reinforcement is a powerful tool in shaping your children’s behavior and boosting their self-esteem. Children thrive on praise and encouragement. When they know that their efforts are appreciated, they are more likely to continue those behaviors. Take the time to acknowledge and celebrate your children’s achievements, no matter how small. A simple "I’m proud of you" can go a long way in making your children feel valued and motivated. Positive reinforcement also helps in building a strong parent-child bond. When children feel supported and encouraged, they are more likely to open up and trust their parents.

    **Embracing the Individuality of Each Child**

    Every child is unique, with their own set of strengths, interests, and challenges. As parents, it’s important to recognize and celebrate this individuality. Avoid comparing your children to each other or to others. Instead, focus on nurturing their individual talents and interests. This might mean supporting one child in their love for music and another in their passion for sports. By embracing and encouraging your children’s unique qualities, you help them develop a strong sense of self and confidence. Let your children know that they are loved for who they are, not for what they achieve.

    **Modeling Healthy Relationships**

    Children learn by observing the behavior of the adults around them. One of the best ways to teach your children about healthy relationships is to model them yourself. Show respect, kindness, and empathy in your interactions with your partner, friends, and family members. Let your children see you resolving conflicts peacefully and expressing your emotions in a healthy way. When children witness positive relationship behaviors, they are more likely to emulate them. Modeling healthy relationships also teaches children the importance of mutual respect, communication, and emotional intelligence.

    **Taking Care of Yourself as a Parent**

    Parenting can be demanding, and it’s easy to put your own needs last. However, taking care of yourself is essential for being the best parent you can be. Make time for self-care, whether it’s through exercise, hobbies, or spending time with friends. When you take care of your own well-being, you have more patience, energy, and positivity to give to your children. It’s also important to model self-care for your children, showing them that taking care of oneself is a priority. Remember, a happy and healthy parent is more likely to raise happy and healthy children.

    **Building a Support Network**

    Parenting is a journey that is best navigated with support. Surround yourself with a network of friends, family, and community resources that you can turn to for advice, encouragement, and help. Sharing your experiences with other parents can provide valuable insights and a sense of camaraderie. Don’t hesitate to seek professional support if needed, whether it’s for parenting advice, mental health support, or relationship counseling. Having a strong support network not only benefits you as a parent but also provides your children with a broader sense of community and belonging.

    **Conclusion: The Path to a Happier Family**

    Turning your parent-child relationship into the family’s secret sauce of happiness is about more than just parenting techniques. It’s about building a loving, supportive environment where each family member feels valued and connected. It’s about finding joy in the everyday moments and creating memories that last a lifetime. By focusing on communication, understanding, and love, you can foster a relationship with your children that is not only strong but also enriching for everyone involved. Remember, happiness in a family is not a destination; it’s a journey that you take together, one moment at a time.
    `
},
  {
    id: 7,
    title: "Article 7",
    tag: "parent",
    imgSrc: article7 || defaultImage,
    additionalImages: articlei7,
    abstract: "Abstract for article 7...",
    content: "Full content for article 7...",
  },
  {
    id: 8,
    title: "Article 8",
    tag: "parent",
    imgSrc: article8 || defaultImage,
    additionalImages: articlei8,
    abstract: "Abstract for article 8...",
    content: "Full content for article 8...",
  },
  {
    id: 9,
    title: "Article 9",
    tag: "parent",
    imgSrc: article9 || defaultImage,
    additionalImages: articlei9,
    abstract: "Abstract for article 9...",
    content: "Full content for article 9...",
  },
  {
    id: 10,
    title: "Article 10",
    tag: "parent",
    imgSrc: article10 || defaultImage,
    additionalImages: articlei10,
    abstract: "Abstract for article 10...",
    content: "Full content for article 10...",
  },
  {
    id: 11,
    title: "Article 11",
    tag: "parent",
    imgSrc: article11 || defaultImage,
    additionalImages: articlei11,
    abstract: "Abstract for article 11...",
    content: "Full content for article 11...",
  },
  {
    id: 12,
    title: "Article 12",
    tag: "parent",
    imgSrc: article12 || defaultImage,
    additionalImages: articlei12,
    abstract: "Abstract for article 12...",
    content: "Full content for article 12...",
  },
  {
    id: 13,
    title: "Article 13",
    tag: "parent",
    imgSrc: article13 || defaultImage,
    additionalImages: articlei13,
    abstract: "Abstract for article 13...",
    content: "Full content for article 13...",
  },
  {
    id: 14,
    title: "Article 14",
    tag: "parent",
    imgSrc: article14 || defaultImage,
    additionalImages: articlei14,
    abstract: "Abstract for article 14...",
    content: "Full content for article 14...",
  },
  {
    id: 15,
    title: "Article 15",
    tag: "parent",
    imgSrc: article15 || defaultImage,
    additionalImages: articlei15,
    abstract: "Abstract for article 15...",
    content: "Full content for article 15...",
  },
  {
    id: 16,
    title: "Article 16",
    tag: "spousal",
    imgSrc: article16 || defaultImage,
    additionalImages: articlei16,
    abstract: "🤔 Bet you didn’t know that the secret to aging well lies in your marriage...",
    content: "Full content for article 16...",
  },
];

export default articles;
