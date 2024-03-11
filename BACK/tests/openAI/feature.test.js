import { describe, expect, it } from 'vitest';
import extractGenerationToJson from '../../app/services/openAi/apiResExtraction.js';
import responseStats from '../../app/services/openAi/apiStats.js';

describe('Test extractGenerationToJson', () => {
  it('should correctly format quiz content', async () => {
    // eslint-disable-next-line max-len
    const content = "[\"Les requins-marteaux\",\"Moyen\",\"Fr\",[[\"Quel est le nom scientifique du requin-marteau?\",\"Sphyrna\",\"Sphirna\",\"Sphyraena\",\"Sphyrna\"],[\"Quelle est la principale caractéristique physique du requin-marteau?\",\"Sa tête en forme de marteau\",\"Sa queue en forme de marteau\",\"Sa couleur grise\",\"Ses dents pointues\"],[\"Où les requins-marteaux sont-ils principalement trouvés?\",\"Dans les eaux tropicales et tempérées\",\"Dans les eaux polaires\",\"Dans les eaux saumâtres\",\"Dans les eaux douces\"],[\"Quelle est la taille moyenne d'un requin-marteau?\",\"Entre 3 et 6 mètres\",\"Entre 1 et 2 mètres\",\"Plus de 10 mètres\",\"Moins de 1 mètre\"],[\"Comment les requins-marteaux chassent-ils leur proie?\",\"En utilisant leur sens électrique\",\"En utilisant leur sens du goût\",\"En utilisant leur vue\",\"En utilisant leur ouïe\"],[\"Quel est le régime alimentaire principal du requin-marteau?\",\"Les poissons\",\"Les algues\",\"Les mammifères marins\",\"Les crustacés\"],[\"Quelle est la durée de gestation d'une femelle requin-marteau?\",\"Environ 9 mois\",\"Environ 2 ans\",\"Environ 6 mois\",\"Environ 1 an\"],[\"Quel est le statut de conservation du requin-marteau selon l'UICN?\",\"En danger\",\"Préoccupation mineure\",\"Éteint\",\"Quasi menacé\"],[\"Quelle est la principale menace pour les requins-marteaux?\",\"La pêche excessive\",\"La pollution marine\",\"Le réchauffement climatique\",\"La destruction de leur habitat\"],[\"Quel est l'organe sensoriel le plus développé chez le requin-marteau?\",\"Leur nez\",\"Leurs yeux\",\"Leurs oreilles\",\"Leurs papilles gustatives\"]]]";

    const expectedOutput = {
      theme: 'Les requins-marteaux',
      difficulty: 'Moyen',
      language: 'Fr',
      questions: [
        {
          label: 'Quel est le nom scientifique du requin-marteau?',
          answers: {
            good_answer: 'Sphyrna',
            answer_1: 'Sphirna',
            answer_2: 'Sphyraena',
            answer_3: 'Sphyrna',
          },
        },
        {
          label: 'Quelle est la principale caractéristique physique du requin-marteau?',
          answers: {
            good_answer: 'Sa tête en forme de marteau',
            answer_1: 'Sa queue en forme de marteau',
            answer_2: 'Sa couleur grise',
            answer_3: 'Ses dents pointues',
          },
        },
        {
          label: 'Où les requins-marteaux sont-ils principalement trouvés?',
          answers: {
            good_answer: 'Dans les eaux tropicales et tempérées',
            answer_1: 'Dans les eaux polaires',
            answer_2: 'Dans les eaux saumâtres',
            answer_3: 'Dans les eaux douces',
          },
        },
        {
          label: "Quelle est la taille moyenne d'un requin-marteau?",
          answers: {
            good_answer: 'Entre 3 et 6 mètres',
            answer_1: 'Entre 1 et 2 mètres',
            answer_2: 'Plus de 10 mètres',
            answer_3: 'Moins de 1 mètre',
          },
        },
        {
          label: 'Comment les requins-marteaux chassent-ils leur proie?',
          answers: {
            good_answer: 'En utilisant leur sens électrique',
            answer_1: 'En utilisant leur sens du goût',
            answer_2: 'En utilisant leur vue',
            answer_3: 'En utilisant leur ouïe',
          },
        },
        {
          label: 'Quel est le régime alimentaire principal du requin-marteau?',
          answers: {
            good_answer: 'Les poissons',
            answer_1: 'Les algues',
            answer_2: 'Les mammifères marins',
            answer_3: 'Les crustacés',
          },
        },
        {
          label: "Quelle est la durée de gestation d'une femelle requin-marteau?",
          answers: {
            good_answer: 'Environ 9 mois',
            answer_1: 'Environ 2 ans',
            answer_2: 'Environ 6 mois',
            answer_3: 'Environ 1 an',
          },
        },
        {
          label: "Quel est le statut de conservation du requin-marteau selon l'UICN?",
          answers: {
            good_answer: 'En danger',
            answer_1: 'Préoccupation mineure',
            answer_2: 'Éteint',
            answer_3: 'Quasi menacé',
          },
        },
        {
          label: 'Quelle est la principale menace pour les requins-marteaux?',
          answers: {
            good_answer: 'La pêche excessive',
            answer_1: 'La pollution marine',
            answer_2: 'Le réchauffement climatique',
            answer_3: 'La destruction de leur habitat',
          },
        },
        {
          label: "Quel est l'organe sensoriel le plus développé chez le requin-marteau?",
          answers: {
            good_answer: 'Leur nez',
            answer_1: 'Leurs yeux',
            answer_2: 'Leurs oreilles',
            answer_3: 'Leurs papilles gustatives',
          },
        },
      ],
    };

    const quizFormated = await extractGenerationToJson(content);
    expect(quizFormated).toEqual(expectedOutput);
  });
});

describe('Test extractGenerationToJson keys and formats', () => {
  it('should have correct keys and formats', async () => {
    const content = "[\"Les marteaux\",\"Moyen\",\"Fr\",[\n  [\"Quel est le nom de l'outil utilisé pour enfoncer des clous ?\", \"Marteau\", \"Marteaux\", \"Marteauz\", \"Martau\"],\n  [\"Quel type de marteau est spécialement conçu pour arracher des clous ?\", \"Arrache-clou\", \"Marteau arracheur\", \"Marteau à clou\", \"Marteau d'arrachage\"]]]";

    const quizFormated = await extractGenerationToJson(content);

    expect(quizFormated).toHaveProperty('theme');
    expect(typeof quizFormated.theme).toBe('string');

    expect(quizFormated).toHaveProperty('difficulty');
    expect(typeof quizFormated.difficulty).toBe('string');
    expect(quizFormated.difficulty).toMatch(/^(Facile|Moyen|Difficile)$/);

    expect(quizFormated).toHaveProperty('language');
    expect(typeof quizFormated.language).toBe('string');

    expect(quizFormated).toHaveProperty('questions');
    expect(Array.isArray(quizFormated.questions)).toBe(true);

    quizFormated.questions.forEach((question) => {
      expect(question).toHaveProperty('label');
      expect(typeof question.label).toBe('string');

      expect(question).toHaveProperty('answers');
      expect(typeof question.answers).toBe('object');
    });
  });
});

describe('Test responseStats', () => {
  it('should correctly calculate statistics', async () => {
    const data = {
      prompt_tokens: 147,
      completion_tokens: 391,
      total_tokens: 538,
    };

    const expectedOutput = {
      promptTokens: 147,
      responseTokens: 391,
      totalTokens: 538,
      promptPrice: 0.000147,
      responsePrice: 0.000782,
      totalPrice: 0.000929,
    };

    const stats = await responseStats(data);
    expect(stats).toEqual(expectedOutput);
  });

  it('should calculate statistics with correct properties and formats', async () => {
    const data = {
      prompt_tokens: 147,
      completion_tokens: 391,
      total_tokens: 538,
    };

    const stats = await responseStats(data);

    // Verify properties exist
    expect(stats).toHaveProperty('promptTokens');
    expect(stats).toHaveProperty('responseTokens');
    expect(stats).toHaveProperty('totalTokens');
    expect(stats).toHaveProperty('promptPrice');
    expect(stats).toHaveProperty('responsePrice');
    expect(stats).toHaveProperty('totalPrice');

    // Verify values formats
    expect(typeof stats.promptTokens).toBe('number');
    expect(typeof stats.responseTokens).toBe('number');
    expect(typeof stats.totalTokens).toBe('number');
    expect(typeof stats.promptPrice).toBe('number');
    expect(typeof stats.responsePrice).toBe('number');
    expect(typeof stats.totalPrice).toBe('number');

    // Verify values are correct
    expect(stats.promptPrice).toBeCloseTo((data.prompt_tokens / 1000) * 0.001, 6);
    expect(stats.responsePrice).toBeCloseTo((data.completion_tokens / 1000) * 0.002, 6);
    expect(stats.totalPrice).toBeCloseTo(stats.promptPrice + stats.responsePrice, 6);
  });
});
