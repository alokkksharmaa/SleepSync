// Get relaxation tips
const getRelaxationTips = async (req, res) => {
  try {
    const tips = [
      {
        title: "Deep Breathing (4-7-8)",
        description: "Inhale through your nose for 4 seconds, hold your breath for 7 seconds, and exhale through your mouth for 8 seconds. Repeat 3-4 times to calm your nervous system and prepare for sleep."
      },
      {
        title: "Progressive Muscle Relaxation",
        description: "Starting from your toes, tense each muscle group for 5 seconds and then release for 10 seconds. Work your way up through your legs, torso, arms, and face. This releases physical tension."
      },
      {
        title: "Guided Imagery",
        description: "Close your eyes and imagine a peaceful place - a beach, forest, or mountain. Focus on the sights, sounds, and smells. This mental escape can reduce anxiety and racing thoughts."
      },
      {
        title: "Body Scan Meditation",
        description: "Lie comfortably and bring attention to each part of your body sequentially, from toes to head. Notice sensations without judgment. This promotes mindfulness and physical awareness."
      },
      {
        title: "Warm Bath with Epsom Salts",
        description: "Take a warm bath 1-2 hours before bedtime. Epsom salts contain magnesium, which can help relax muscles. Add lavender essential oil for additional calming effects."
      },
      {
        title: "Digital Detox",
        description: "Turn off all screens (phone, TV, computer) at least 1 hour before bed. The blue light from devices can disrupt melatonin production. Read a book or listen to soft music instead."
      }
    ];

    res.json({
      message: 'Relaxation tips retrieved successfully',
      tips
    });
  } catch (error) {
    console.error('Get relaxation tips error:', error);
    res.status(500).json({
      message: 'Server error retrieving relaxation tips',
      error: error.message
    });
  }
};

module.exports = {
  getRelaxationTips
};
